/**
 * @file Composant TracksListItem.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Composant TrackListItemAction.
 */
import TracksListItemAction from './TracksListItemAction'

import VueX from 'vuex'

export default {
  data () {
    return {
      /**
       * Hauteur angulaire d'un element de la liste des pistes (en radians).
       * @type {Number}
       */
      angularHeight: this.$store.state.settings.playlist.tracksList.item.angularHeight,
      /**
       * Menu des actions de piste ouvert.
       * @type {Boolean}
       */
      active: false
    }
  },
  computed: {
    ...VueX.mapGetters('playlist/player', ['playerIs']),
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
     * Lance un evenement pour executer une action sur une piste.
     * @param {String} action - L'action a effectuer.
     */
    trackAction (action) {
      this.active = false
      this.$emit('trackAction', action, this.position)
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
     * Position de l'element par rapport a l'element courant.
     * @type {Number}
     */
    position: {
      type: Number,
      required: true
    }
  }
}
