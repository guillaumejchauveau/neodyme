/**
 * @file Definit la classe Player.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import EventEmitter from 'events'

/**
 * Classe qui represente un Lecteur.
 * @extends EventEmitter
 * @property {AudioContext}             audioContext - Contexte audio.
 * @property {AudioBuffer}              buffer       - Contient les donnees audio.
 * @property {AudioScheduledSourceNode} audioSource  - Source creee pour lire les donnees audio.
 * @property {Number}                   duration     - La duree des donnees audio (en secondes).
 * @property {Number}                   startTime    - Le temps du contexte audio au demarrage de la lecture (en secondes).
 * @property {Number}                   position     - La position de lecture dans les donnees audio (en secondes).
 * @property {Boolean}                  playing      - Indique si la lecture est en cours.
 */
class Player extends EventEmitter {
    /**
     * Cree un Lecteur.
     */
    constructor() {
        super()
        
        this.audioContext = new AudioContext()
        this.buffer       = null
        this.duration     = null // TODO: Move to Store
        this.startTime    = 0
        this.position     = 0 // TODO: Move to Store
        this.playing      = false // TODO: Move to Store
    }
    
    /**
     * Decode et enregistre les donnees audio.
     * @param {ArrayBuffer} arrayBuffer - Donnees brutes.
     * @returns {Promise}
     */
    setAudioBuffer(arrayBuffer) {
        const that = this
        
        return new Promise(function (resolve, reject) {
            that.audioContext.decodeAudioData(arrayBuffer, audioBuffer => {
                that.buffer   = audioBuffer
                that.duration = Math.round(audioBuffer.duration)
                resolve()
            })
        })
    }
    
    /**
     * Efface les donnees audio.
     */
    clearBuffer() {
        this.buffer   = null
        this.duration = null
    }
    
    /**
     * Cree une source audio pour le contexte. Met en place un ecouteur quand la source arrete la lecture.
     */
    connectSource() {
        this.audioSource        = this.audioContext.createBufferSource()
        this.audioSource.buffer = this.buffer
        this.audioSource.connect(this.audioContext.destination)
        
        this.audioSource.onended = event => { // Quand la source s'arrete de lire (par arret manuel ou automatique).
            this.currentPosition // Declenche l'actualisation de la position.
            if (this.position >= this.duration) { // Si la source s'est arretee car au bout des donnees.
                this.position = this.duration
                this.emit('ended') // Emet un evenement quand les donnees ont ete entierement lues.
            }
            this.playing     = false
            this.audioSource = null // Detruit la source.
        }
    }
    
    /**
     * Lance la lecture des donnees audio.
     * @param {Number} position - La position de demarrage dans les donnees audio (en secondes).
     */
    start(position = 0) {
        this.connectSource()
        this.startTime = Math.round(this.audioContext.currentTime - position)
        this.position  = position
        this.audioSource.start(0, position) // Lance la lecture au temps 0 du contexte et a position dans les donnees.
        this.playing = true
    }
    
    /**
     * Arrete la lecture des donnees audio.
     */
    stop() {
        if (this.playing) {
            this.audioSource.stop()
        }
    }
    
    /**
     * Actualise et retourne la position.
     * @returns {Number}
     */
    get currentPosition() {
        this.position = this.playing ? Math.round(this.audioContext.currentTime - this.startTime) : this.position
        
        return this.position
    }
}

export default Player
