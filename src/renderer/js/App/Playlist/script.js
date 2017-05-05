/**
 * @file Composant Playlist.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import VueX from 'vuex'

/**
 * Composant ControlPanel.
 */
import ControlPanel from './ControlPanel'
/**
 * Composant TracksList.
 */
import TracksList from './TracksList'

/**
 * Classe Player.
 * @type {Player}
 */
import Player from './Player'

export default {
  data () {
    return {
      player: null,
      savedCurrentTrackPosition: 0
    }
  },
  computed: {
    ...VueX.mapState('playlist', ['currentTrackIndex']),
    ...VueX.mapState('playlist/player', {
      currentPosition: 'position'
    }),
    ...VueX.mapGetters('playlist/player', ['playerIs'])
  },
  methods: {
    ...VueX.mapMutations('playlist', {
      setCurrentTrack: 'SET_CURRENT_TRACK'
    }),
    /**
     * Determine la piste courante, la position et lance la lecture.
     * @param {Number} requestedIndex    - L'index d'une piste.
     * @param {Number} requestedPosition - La position sur la piste (en secondes).
     * @returns {Promise}
     */
    play (requestedIndex = null, requestedPosition = null) {
      let position = requestedPosition

      return new Promise((resolve, reject) => {
        if (!this.playerIs('LOADING') && this.$store.getters['playlist/tracksCount']) {
          this.player
              .stop()
              .then(() => {
                // Si une piste specifique est demandee.
                if (requestedIndex !== null) {
                  this.setCurrentTrack(requestedIndex)
                }
                // S'il n'y a pas de piste courante.
                if (this.currentTrackIndex === -1) {
                  this.setCurrentTrack(0)
                }

                // S'il n'y a pas de position demandee.
                if (position === null) {
                  position = this.savedCurrentTrackPosition
                }

                this.playCurrentTrack(position)
                    .then(resolve)
                    .catch(reject)
              })
              .catch(reject)
        } else {
          reject(new Error('Player is loading'))
        }
      })
    },
    /**
     * Arrete la lecture et enregistre la position d'arret.
     * @returns {Promise}
     */
    pause () {
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
          reject(new Error('Player is loading'))
        }
      })
    },
    /**
     * Arrete la lecture des pistes.
     * @returns {Promise}
     */
    stop () {
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
          reject(new Error('Player is loading'))
        }
      })
    },
    /**
     * Passe a la piste prescedente.
     * @returns {Promise}
     */
    previous () {
      return new Promise((resolve, reject) => {
        if (!this.playerIs('LOADING')) {
          this.player
              .stop()
              .then(() => {
                this.setCurrentTrack(this.currentTrackIndex - 1)
                this.playCurrentTrack()
                    .then(resolve)
                    .catch(reject)
              })
              .catch(reject)
        } else {
          reject(new Error('Player is loading'))
        }
      })
    },
    /**
     * Passe a la piste suivante.
     * @returns {Promise}
     */
    next () {
      return new Promise((resolve, reject) => {
        if (!this.playerIs('LOADING')) {
          this.player
              .stop()
              .then(() => {
                this.setCurrentTrack(this.currentTrackIndex + 1)
                this.playCurrentTrack()
                    .then(resolve)
                    .catch(reject)
              })
              .catch(reject)
        } else {
          reject(new Error('Player is loading'))
        }
      })
    },
    /**
     * Efface la liste de lecture.
     * @returns {Promise}
     */
    clear () {
      return new Promise((resolve, reject) => {
        if (!this.playerIs('LOADING')) {
          this.stop()
              .then(() => {
                this.$store.commit('playlist/CLEAR_TRACKS')
                resolve()
              })
              .catch(reject)
        } else {
          reject(new Error('Player is loading'))
        }
      })
    },
    /**
     * Lance la lecture de la piste courante.
     * @param {Number} position - La position sur la piste (en secondes).
     * @returns {Promise}
     */
    playCurrentTrack (position = 0) {
      return new Promise((resolve, reject) => {
        if (!this.playerIs('LOADING')) {
          this.player
              .stop()
              .then(() => {
                const currentTrack = this.$store.getters['playlist/currentTrack']

                if (currentTrack) {
                  this.$store.commit('playlist/player/SET_STATUS', 'LOADING')

                  this.$nextTick(() => {
                    // Charge les donnees brutes.
                    currentTrack.loadDataBuffer()
                                .then(() => {
                                  // Convertit les donnees brutes.
                                  this.player
                                      .setAudioBuffer(currentTrack.dataBuffer)
                                      .then(() => {
                                        // Lance la lecture.
                                        this.player.start(position)
                                        this.player.removeListener('endReached', this.playerEndReachedHandler)
                                        this.player.once('endReached', this.playerEndReachedHandler)

                                        resolve()
                                      })
                                      .catch(reject)
                                })
                                .catch(reject)
                  })
                } else {
                  reject(new ReferenceError('No current track'))
                }
              })
              .catch(reject)
        } else {
          reject(new Error('Player is loading'))
        }
      })
    },
    /**
     * Determine la piste a lire lorsque la lecture est terminee.
     */
    playerEndReachedHandler () {
      if (!this.playerIs('LOADING')) {
        this.$nextTick(() => {
          this.next()
              .catch(() => {
                this.stop()
              })
        })
      }
    },
    /**
     * Lance l'action de l'evenement trackAction.
     * @param {String} action - L'action a effectuer.
     * @param {Number} index  - L'index de la piste.
     */
    trackActionHandler (action, index) {
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
              } else if (index < this.currentTrackIndex) {
                this.pause()
                    .then(() => {
                      this.$store.commit('playlist/REMOVE_TRACK', index)
                      this.setCurrentTrack(this.currentTrackIndex - 1)
                      this.play()
                    })
              } else {
                this.$store.commit('playlist/REMOVE_TRACK', index)
              }
            }
            break
          default:
            break
        }
      })
    }
  },
  components: {
    ControlPanel,
    TracksList
  },
  mounted () {
    this.player = new Player(this.$store) // Cree un lecteur.
  }
}
