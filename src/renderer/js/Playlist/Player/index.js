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
 * @property {Number}                   startTime    - Le temps du contexte audio au demarrage de la lecture (en secondes).
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
            try {
                this.audioContext.decodeAudioData(arrayBuffer, audioBuffer => {
                    this.buffer = audioBuffer
                    this.$store.commit('playlist/player/SET_DURATION', Math.round(audioBuffer.duration))
                    this.$store.commit('playlist/player/SET_STATUS', 'READY')
                    resolve()
                })
            } catch (exception) {
                reject(exception)
            }
        })
    }
    
    /**
     * Efface les donnees audio.
     */
    clearBuffer() {
        this.buffer = null
        this.$store.commit('playlist/player/SET_POSITION', 0)
        this.$store.commit('playlist/player/SET_DURATION', 0)
    }
    
    /**
     * Cree une source audio pour le contexte. Met en place un ecouteur quand la source arrete la lecture.
     */
    connectSource() {
        this.audioSource        = this.audioContext.createBufferSource()
        this.audioSource.buffer = this.buffer
        this.audioSource.connect(this.audioContext.destination)
        
        this.audioSource.onended = event => { // Quand la source s'arrete de lire (par arret manuel ou automatique).
            this.$store.commit('playlist/player/SET_STATUS', 'LOADING')
            this.updatePosition(this)
            clearInterval(this.updatePosition) // Desactive la mise a jour automatique de la position.
            
            this.audioSource.disconnect()
            this.audioSource = null // Detruit la source.
            
            this.$store.commit('playlist/player/SET_STATUS', 'READY')
            
            // Si la source s'est arretee car au bout des donnees (moins 1 secondes pour resoudre des problemes lies aux arrondis).
            if (this.$store.state.playlist.player.position >= this.$store.state.playlist.player.duration - 1) {
                this.$store.commit('playlist/player/SET_POSITION', this.$store.state.playlist.player.duration)
                this.emit('endReached') // Emet un evenement quand les donnees ont ete entierement lues.
            } else {
                this.emit('stopped')
            }
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
        setInterval(() => {
            this.updatePosition(this)
        }, 1000)
    }
    
    /**
     * Arrete la lecture des donnees audio.
     * @returns {Promise}
     */
    stop() {
        return new Promise((resolve, reject) => {
            if (this.$store.getters['playlist/player/playerIs']('PLAYING')) {
                try {
                    this.audioSource.stop()
                } catch (exception) {
                    reject(exception)
                }
            } else {
                resolve()
                return
            }
            
            this.once('stopped', resolve)
        })
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
