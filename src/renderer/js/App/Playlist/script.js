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
     * @param {Number|null} index    - L'indice de la piste a lire (facultatif).
     * @param {Number|null} position - La position pour commencer la lecture (en secondes, facultatif).
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
     * @param {Number} index  - L'indice de la piste.
     */
    trackActionHandler (action, index) {
      const track = this.$store.state.playlist.tracks[index]
      switch (action) {
        // Lire la piste.
        case 'play':
          this.play(index, 0)
          break
        // Supprimer la piste.
        case 'remove':
          this.$store.dispatch('playlist/remove', index)
          break
        // Aller a l'artiste de la piste.
        case 'goto-artist':
          this.$store.dispatch('panel/setCustomPanelConfig', {decisiveCriteriaSet: track.dcs, criterionType: 'artist'})
          break
        // Aller a l'album de la piste.
        case 'goto-album':
          this.$store.dispatch('panel/setCustomPanelConfig', {decisiveCriteriaSet: track.dcs, criterionType: 'album'})
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
