<template>
    <div id="playlist">
        <div class="playlist-content">
            <tracks-list></tracks-list>
            <control-panel></control-panel>
        </div>
    </div>
</template>

<script>
    import ControlPanel from './ControlPanel'
    import TracksList from './TracksList'
    
    /**
     * Classe Player.
     * @type {Player}
     */
    import Player from './Player'
    
    export default {
        data() {
            return {
                player                   : null,
                savedCurrentTrackPosition: 0
            }
        },
        methods   : {
            /**
             * Determine la piste courante et la position.
             * @param {Number} index    - L'index d'une piste.
             * @param {Number} position - La position sur la piste (en secondes).
             */
            play(index = null, position = null) {
                if (this.$store.getters['playlist/tracksCount']) {
                    // Si une piste specifique est demandee.
                    if (index !== null) {
                        this.$store.commit('playlist/SET_CURRENT_TRACK', index)
                    }
                    // S'il n'y a pas de piste courante.
                    if (this.$store.state.playlist.currentTrackIndex === -1) {
                        this.$store.commit('playlist/SET_CURRENT_TRACK', 0)
                    }
                    // S'il n'y a pas de position demandee.
                    if (position === null) {
                        position = this.savedCurrentTrackPosition ? this.savedCurrentTrackPosition : 0
                    }
                    
                    this.playCurrentTrack(position)
                }
            },
            /**
             * Arrete la lecture et enregistre la position d'arret.
             */
            pause() {
                this.player.stop()
                this.savedCurrentTrackPosition = this.player.currentPosition
            },
            /**
             * Arrete la lecture des pistes.
             */
            stop() {
                this.player.stop()
                this.player.clearBuffer()
                this.savedCurrentTrackPosition = 0
                this.$store.commit('playlist/SET_CURRENT_TRACK', -1)
            },
            /**
             * Lance la lecture de la piste courante.
             * @param {Number} position - La position sur la piste (en secondes).
             */
            playCurrentTrack(position = 0) {
                const currentTrack = this.$store.getters['playlist/currentTrack']
                if (currentTrack) {
                    currentTrack.loadDataBuffer()
                                .then(() => {
                                    this.player
                                        .setAudioBuffer(currentTrack.dataBuffer)
                                        .then(() => {
                                            this.player.start(position)
                                            this.player.once('ended', this.playerEndedHandler)
                                        })
                                })
                }
            },
            /**
             * Determine la piste a lire lorsque la lecture est terminee.
             */
            playerEndedHandler() {
                this.savedCurrentTrackPosition = 0
                this.$store.commit('playlist/SET_CURRENT_TRACK', this.$store.state.playlist.currentTrackIndex + 1)
                
                if (this.$store.state.playlist.currentTrackIndex !== -1) {
                    this.playCurrentTrack()
                }
            }
        },
        components: {
            ControlPanel,
            TracksList
        },
        mounted() {
            this.player = new Player() // Cree un lecteur.
        }
    }
</script>

<style src="./style.scss"></style>
