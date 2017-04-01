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
    constructor($store) {
        super()
        
        this.audioContext = new AudioContext()
        this.buffer       = null
        this.startTime    = 0
        this.$store       = $store
    }
    
    /**
     * Decode et enregistre les donnees audio.
     * @param {ArrayBuffer} arrayBuffer - Donnees brutes.
     * @returns {Promise}
     */
    setAudioBuffer(arrayBuffer) {
        return new Promise((resolve, reject) => {
            this.$store.commit('playlist/player/SET_STATUS', 'LOADING')
            this.audioContext.decodeAudioData(arrayBuffer, audioBuffer => {
                this.buffer = audioBuffer
                this.$store.commit('playlist/player/SET_DURATION', Math.round(audioBuffer.duration))
                this.$store.commit('playlist/player/SET_STATUS', 'READY')
                resolve()
            })
        })
    }
    
    /**
     * Efface les donnees audio.
     */
    clearBuffer() {
        this.buffer = null
        this.$store.commit('playlist/player/SET_DURATION', null)
    }
    
    /**
     * Cree une source audio pour le contexte. Met en place un ecouteur quand la source arrete la lecture.
     */
    connectSource() {
        this.audioSource        = this.audioContext.createBufferSource()
        this.audioSource.buffer = this.buffer
        this.audioSource.connect(this.audioContext.destination)
        
        this.audioSource.onended = event => { // Quand la source s'arrete de lire (par arret manuel ou automatique).
            this.updatePosition(this)
            clearInterval(this.updatePosition) // Desactive la mise a jour automatique de la position.
            
            if (this.$store.state.playlist.player.position >= this.$store.state.playlist.player.duration) { // Si la source s'est arretee car au bout des donnees.
                this.$store.commit('playlist/player/SET_POSITION', this.$store.state.playlist.player.duration)
                this.emit('ended') // Emet un evenement quand les donnees ont ete entierement lues.
            }
            
            this.$store.commit('playlist/player/SET_STATUS', 'READY')
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
        this.$store.commit('playlist/player/SET_POSITION', position)
        this.audioSource.start(0, position) // Lance la lecture au temps 0 du contexte et a position dans les donnees.
        this.$store.commit('playlist/player/SET_STATUS', 'PLAYING')
        
        this.updatePosition(this)
        const that = this
        setInterval(function () {
            that.updatePosition(that)
        }, 1000)
    }
    
    /**
     * Arrete la lecture des donnees audio.
     */
    stop() {
        if (this.$store.getters['playlist/player/playerIs']('PLAYING')) {
            this.audioSource.stop()
        }
    }
    
    /**
     * Actualise la position.
     * @returns {Number}
     */
    updatePosition(context) {
        if (context.$store.getters['playlist/player/playerIs']('PLAYING')) {
            context.$store.commit('playlist/player/SET_POSITION',
                                  Math.round(context.audioContext.currentTime - context.startTime))
        }
    }
}

export default Player
