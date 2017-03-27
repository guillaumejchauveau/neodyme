/**
 * @file Definit la classe FileSystemProvider.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import fs from 'fs'
import gs from 'glob-stream'
import mm from 'musicmetadata'

/**
 * Conteneur d'injection de dependances.
 * @type {Object}
 */
import DIC from '../../DIC'
/**
 * Classe Criterion.
 * @type {Criterion}
 */
import Criterion from '../../Criterion'
/**
 * Classe DecisiveCriteriaSet.
 * @type {DecisiveCriteriaSet}
 */
import DecisiveCriteriaSet from '../../Criterion/CriteriaSet/DecisiveCriteriaSet'
/**
 * Classe Provider.
 * @type {Provider}
 */
import Provider from '../'

/**
 * Classe qui represente une source systeme de fichiers.
 * @extends Provider
 */
class FileSystemProvider extends Provider {
    /**
     * Cree une source systeme de fichiers.
     * @param {Object} providerConfig - La configuration de la source.
     */
    constructor(providerConfig) {
        super(providerConfig)
        
        this.makeTrackList()
    }
    
    /**
     * Enregistre les pistes.
     * @throws Lance une exception si une erreur survient lors de la lecture des metadonnees.
     */
    makeTrackList() {
        // Recupere un Stream de chemins pour chaques fichiers.
        const tracksStream = gs(`./**/*.@(${this.config.exts})`, {
            cwd    : this.config.dir,
            cwdbase: true
        })
        
        // A chaque fois qu'un chemin est trouve.
        tracksStream.on('data', track => {
            const trackStream = fs.createReadStream(track.path) // Creer un Stream du fichier.
            // Recupere les metadonnees.
            mm(trackStream, {duration: this.config.duration}, (err, metadata) => {
                if (err) {
                    throw err
                }
                trackStream.close()
                
                const dcs = new DecisiveCriteriaSet({
                                                        provider: this,
                                                        id      : track.path
                                                    })
                
                DIC['ConfigurationStore'].store.criterion.types.forEach((criterionType, index) => {
                    dcs.add(new Criterion(criterionType, this.config.typesMap[index](metadata)))
                })
                
                // Enregistre la nouvelle piste.
                DIC['DCSStore'].add(dcs)
            })
        })
    }
    
    /**
     * Recupere les donnees brutes d'une piste.
     * @param {String} path - L'identifiant unique pour la source (ici le chemin du fichier).
     * @returns {Promise} Une promise qui resout un {ArrayBuffer}.
     */
    getDataBuffer(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(err)
                }
                
                resolve(data.buffer)
            })
        })
    }
}

export default FileSystemProvider
