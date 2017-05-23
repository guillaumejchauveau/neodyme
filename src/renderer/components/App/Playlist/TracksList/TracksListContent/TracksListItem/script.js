/**
 * @file Composant TracksListItem.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Composant TrackListItemAction.
 */
import TracksListItemAction from './TracksListItemAction'

export default {
  data () {
    return {
      /**
       * La hauteur angulaire d'un element de la liste des pistes (en radians).
       * @type {Number}
       */
      angularHeight: this.$store.state.settings.playlist.tracksList.item.angularHeight,
      /**
       * Le menu des actions de piste est-il ouvert ?
       * @type {Boolean}
       */
      active: false
    }
  },
  computed: {
    /**
     * Compile le style dynamique de l'element.
     * @returns {String} Le contenu de l'attribut style.
     */
    itemStyle () {
      return `transform: translateY(-50%) rotate(${this.position * this.angularHeight}rad);`
    }
  },
  methods: {
    /**
     * Execute une action sur une piste.
     * @param {String} action - L'action a effectuer.
     */
    trackAction (action) {
      this.active = false
      const track = this.$store.state.playlist.tracks[this.trackIndex]
      switch (action) {
        // Lire la piste.
        case 'play':
          this.$store.dispatch('playlist/play', this.trackIndex)
          break
        // Supprimer la piste.
        case 'remove':
          this.$store.dispatch('playlist/remove', this.trackIndex)
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
    TracksListItemAction
  },
  props: {
    /**
     * Les criteres de la piste.
     * @type {Object}
     */
    data: {
      type: Object,
      required: true
    },
    /**
     * L'indice de la piste correspondante.
     * @type {Number}
     */
    trackIndex: {
      type: Number,
      required: true
    },
    /**
     * La position de l'element par rapport a l'element courant.
     * @type {Number}
     */
    position: {
      type: Number,
      required: true
    }
  }
}
