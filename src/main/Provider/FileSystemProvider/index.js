const fs = require('fs')
const gs = require('glob-stream')
const mm = require('musicmetadata')

const DIC                 = require('../../DIC')
const Criterion           = require('../../Criterion')
const DecisiveCriteriaSet = require('../../Criterion/CriteriaSet/DecisiveCriteriaSet')

const Provider = require('../')

class FileSystemProvider extends Provider {
    constructor(providerConfig) {
        super(providerConfig)
        
        this.makeTrackList()
    }
    
    makeTrackList() {
        // Recupere un Stream de chemins pour chaques fichiers
        const tracksStream = gs(`./**/*.@(${this.config.exts})`, {
            cwd    : this.config.dir,
            cwdbase: true
        })
        
        // A chaque fois qu'un chemin est trouve
        tracksStream.on('data', track => {
            const trackStream = fs.createReadStream(track.path) // Creer un Stream du fichier
            // Recupere les metadonnees
            mm(trackStream, {duration: this.config.duration}, (err, metadata) => {
                if (err) {
                    throw err
                }
                trackStream.close()
                
                const dcs = new DecisiveCriteriaSet({
                    provider: this,
                    id      : track.path
                })
                
                DIC.get('ConfigurationStore')
                   .store
                   .criterion
                   .types
                   .forEach((criterionType, index) => {
                       dcs.add(new Criterion(criterionType, this.config.typesMap[index](metadata)))
                   })
                
                // Enregistre le nouveau morceau
                DIC.get('DCSStore')
                   .add(dcs)
            })
        })
    }
}

module.exports = FileSystemProvider
