<template>
    <div id="playlist">
        <div class="playlist-content">
            <tracks-list @trackAction="trackActionHandler"></tracks-list>
            <control-panel @play="play"
                           @pause="pause"
                           @stop="stop"
                           @previous="previous"
                           @next="next"
                           @clear="clear"></control-panel>
        </div>
    </div>
</template>

<script>
    import VueX from 'vuex'
    
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
        computed  : {
            ...VueX.mapState('playlist', ['currentTrackIndex']),
            ...VueX.mapState('playlist/player', {
                currentPosition: 'position'
            }),
            ...VueX.mapGetters('playlist/player', ['playerIs'])
        },
        methods   : {
            ...VueX.mapMutations('playlist', {
                setCurrentTrack: 'SET_CURRENT_TRACK'
            }),
            /**
             * Determine la piste courante et la position.
             * @param {Number} index    - L'index d'une piste.
             * @param {Number} position - La position sur la piste (en secondes).
             */
            play(index = null, position = null) {
                if (!this.playerIs('LOADING') && this.$store.getters['playlist/tracksCount']) {
                    if (index !== null) { // Si une piste specifique est demandee.
                        this.stop()
                        this.setCurrentTrack(index)
                    }
                    if (this.currentTrackIndex === -1) { // S'il n'y a pas de piste courante.
                        this.setCurrentTrack(0)
                    }
                    
                    if (position === null) { // S'il n'y a pas de position demandee.
                        position = this.savedCurrentTrackPosition
                    }
                    
                    this.playCurrentTrack(position)
                }
            },
            /**
             * Arrete la lecture et enregistre la position d'arret.
             */
            pause() {
                if (!this.playerIs('LOADING')) {
                    this.player.stop()
                    this.savedCurrentTrackPosition = this.currentPosition
                }
            },
            /**
             * Arrete la lecture des pistes.
             */
            stop() {
                if (!this.playerIs('LOADING')) {
                    this.player.stop()
                    this.player.clearBuffer()
                    this.savedCurrentTrackPosition = 0
                    this.setCurrentTrack(-1)
                }
            },
            /**
             * Passe a la piste prescedente.
             */
            previous() {
                if (!this.playerIs('LOADING')) {
                    this.player.stop()
                    this.savedCurrentTrackPosition = 0
                    this.setCurrentTrack(this.currentTrackIndex - 1)
                    this.playCurrentTrack()
                }
            },
            /**
             * Passe a la piste suivante.
             */
            next() {
                if (!this.playerIs('LOADING')) {
                    this.player.stop()
                    this.savedCurrentTrackPosition = 0
                    this.setCurrentTrack(this.currentTrackIndex + 1)
                    this.playCurrentTrack()
                }
            },
            /**
             * Efface la liste de lecture.
             */
            clear() {
                if (!this.playerIs('LOADING')) {
                    this.stop()
                    this.$store.commit('playlist/CLEAR_TRACKS')
                }
            },
            /**
             * Lance la lecture de la piste courante.
             * @param {Number} position - La position sur la piste (en secondes).
             */
            playCurrentTrack(position = 0) {
                this.player.stop()
                const currentTrack = this.$store.getters['playlist/currentTrack']
                if (currentTrack) {
                    this.$store.commit('playlist/player/SET_STATUS', 'LOADING')
                    
                    this.$nextTick(() => { // Attend la prochaine actualisation du DOM pour commencer.
                        currentTrack.loadDataBuffer()
                                    .then(() => {
                                        this.player
                                            .setAudioBuffer(currentTrack.dataBuffer)
                                            .then(() => {
                                                this.player.start(position)
                                                this.player.once('ended', this.playerEndedHandler)
                                            })
                                    })
                    })
                }
            },
            /**
             * Determine la piste a lire lorsque la lecture est terminee.
             */
            playerEndedHandler() {
                this.next()
            },
            /**
             * Lance l'action de l'evenement trackAction.
             * @param {String} action - L'action a effectuer.
             * @param {Number} index  - L'index de la piste.
             */
            trackActionHandler(action, index) {
                switch (action) {
                    case 'play':
                        this.play(index)
                        break
                    case 'remove':
                        if (!this.playerIs('LOADING')) {
                            if (index === this.currentTrackIndex) {
                                this.stop()
                            }
                            
                            this.$store.commit('playlist/REMOVE_TRACK', index)
                        }
                }
            }
        },
        components: {
            ControlPanel,
            TracksList
        },
        mounted() {
            this.player = new Player(this.$store) // Cree un lecteur.
        }
    }
</script>

<style src="./style.scss"></style>
