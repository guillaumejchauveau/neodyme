/**
 * @file Composant Playlist.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Composant ControlPanel.
 */
import ControlPanel from './ControlPanel'
/**
 * Composant TracksList.
 */
import TracksList from './TracksList'

export default {
  methods: {
    /**
     * Lance la lecture.
     * @returns {Promise}
     */
    play (index = null, position = null) {
      return this.$store.dispatch('playlist/play', {index, position})
    },
    /**
     * Arrete la lecture.
     * @returns {Promise}
     */
    pause () {
      return this.$store.dispatch('playlist/pause')
    },
    /**
     * Arrete la lecture des pistes.
     * @returns {Promise}
     */
    stop () {
      return this.$store.dispatch('playlist/stop')
    },
    /**
     * Passe a la piste prescedente.
     * @returns {Promise}
     */
    previous () {
      return this.$store.dispatch('playlist/previous')
    },
    /**
     * Passe a la piste suivante.
     * @returns {Promise}
     */
    next () {
      return this.$store.dispatch('playlist/next')
    },
    /**
     * Efface la liste de lecture.
     * @returns {Promise}
     */
    clear () {
      return this.$store.dispatch('playlist/clear')
    },
    /**
     * Lance l'action de l'evenement trackAction.
     * @param {String} action - L'action a effectuer.
     * @param {Number} index  - L'index de la piste.
     */
    trackActionHandler (action, index) {
      switch (action) {
        case 'play':
          this.play(index, 0)
          break
        case 'remove':
          this.$store.dispatch('playlist/remove', index)
          break
        default:
          break
      }
    }
  },
  components: {
    ControlPanel,
    TracksList
  }
}
