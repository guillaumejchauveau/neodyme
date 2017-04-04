<template>
    <div id="playlist">
        <div class="playlist-content">
            <tracks-list @trackAction="trackActionHandler"></tracks-list>
            <control-panel @play="$nextTick(play)"
                           @pause="$nextTick(pause)"
                           @stop="$nextTick(stop)"
                           @previous="$nextTick(previous)"
                           @next="$nextTick(next)"
                           @clear="$nextTick(clear)"></control-panel>
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
             * @returns {Promise}
             */
            play(index = null, position = null) {
                return new Promise((resolve, reject) => {
                    if (!this.playerIs('LOADING') && this.$store.getters['playlist/tracksCount']) {
                        this.player
                            .stop()
                            .then(() => {
                                if (index !== null) { // Si une piste specifique est demandee.
                                    this.setCurrentTrack(index)
                                }
                                if (this.currentTrackIndex === -1) { // S'il n'y a pas de piste courante.
                                    this.setCurrentTrack(0)
                                }
                            
                                if (position === null) { // S'il n'y a pas de position demandee.
                                    position = this.savedCurrentTrackPosition
                                }
                            
                                this.playCurrentTrack(position)
                                    .then(resolve)
                                    .catch(reject)
                            })
                            .catch(reject)
                    } else {
                        reject()
                    }
                })
            },
            /**
             * Arrete la lecture et enregistre la position d'arret.
             * @returns {Promise}
             */
            pause() {
                return new Promise((resolve, reject) => {
                    if (!this.playerIs('LOADING')) {
                        this.player
                            .stop()
                            .then(() => {
                                this.savedCurrentTrackPosition = this.currentPosition
                                resolve()
                            })
                            .catch(reject)
                    } else {
                        reject()
                    }
                })
            },
            /**
             * Arrete la lecture des pistes.
             * @returns {Promise}
             */
            stop() {
                return new Promise((resolve, reject) => {
                    if (!this.playerIs('LOADING')) {
                        this.player
                            .stop()
                            .then(() => {
                                this.player.clearBuffer()
                                this.savedCurrentTrackPosition = 0
                                this.setCurrentTrack(-1)
                                resolve()
                            })
                            .catch(reject)
                    } else {
                        reject()
                    }
                })
            },
            /**
             * Passe a la piste prescedente.
             * @returns {Promise}
             */
            previous() {
                return new Promise((resolve, reject) => {
                    if (!this.playerIs('LOADING')) {
                        this.stop()
                            .then(() => {
                                this.setCurrentTrack(this.currentTrackIndex - 1)
                                this.playCurrentTrack()
                                    .then(resolve)
                                    .catch(reject)
                            })
                            .catch(reject)
                    } else {
                        reject()
                    }
                })
            },
            /**
             * Passe a la piste suivante.
             * @returns {Promise}
             */
            next() {
                return new Promise((resolve, reject) => {
                    if (!this.playerIs('LOADING')) {
                        this.stop()
                            .then(() => {
                                this.setCurrentTrack(this.currentTrackIndex + 1)
                                this.playCurrentTrack()
                                    .then(resolve)
                                    .catch(reject)
                            })
                            .catch(reject)
                    } else {
                        reject()
                    }
                })
            },
            /**
             * Efface la liste de lecture.
             * @returns {Promise}
             */
            clear() {
                return new Promise((resolve, reject) => {
                    if (!this.playerIs('LOADING')) {
                        this.stop()
                            .then(() => {
                                this.$store.commit('playlist/CLEAR_TRACKS')
                                resolve()
                            })
                            .catch(reject)
                    } else {
                        reject()
                    }
                })
            },
            /**
             * Lance la lecture de la piste courante.
             * @param {Number} position - La position sur la piste (en secondes).
             * @returns {Promise}
             */
            playCurrentTrack(position = 0) {
                return new Promise((resolve, reject) => {
                    this.player
                        .stop()
                        .then(() => {
                            const currentTrack = this.$store.getters['playlist/currentTrack']
                        
                            if (currentTrack) {
                                this.$store.commit('playlist/player/SET_STATUS', 'LOADING')
                            
                                this.$nextTick(() => {
                                    currentTrack.loadDataBuffer()
                                                .then(() => {
                                                    this.player
                                                        .setAudioBuffer(currentTrack.dataBuffer)
                                                        .then(() => {
                                                            this.player.start(position)
                                                            resolve()
                                        
                                                            this.player.once('endReached', this.playerEndReachedHandler)
                                                        })
                                                        .catch(reject)
                                                })
                                                .catch(reject)
                                })
                            } else {
                                reject()
                            }
                        })
                        .catch(reject)
                })
            },
            /**
             * Determine la piste a lire lorsque la lecture est terminee.
             */
            playerEndReachedHandler() {
                this.$nextTick(() => {
                    this.next()
                })
            },
            /**
             * Lance l'action de l'evenement trackAction.
             * @param {String} action - L'action a effectuer.
             * @param {Number} index  - L'index de la piste.
             */
            trackActionHandler(action, index) {
                this.$nextTick(() => {
                    switch (action) {
                        case 'play':
                            if (!this.playerIs('LOADING')) {
                                this.stop()
                                    .then(() => {
                                        this.play(index)
                                    })
                            }
                            break
                        case 'remove':
                            if (!this.playerIs('LOADING')) {
                                if (index === this.currentTrackIndex) {
                                    this.stop()
                                        .then(() => {
                                            this.$store.commit('playlist/REMOVE_TRACK', index)
                                        })
                                    
                                    return
                                }
                                
                                this.$store.commit('playlist/REMOVE_TRACK', index)
                            }
                    }
                })
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
