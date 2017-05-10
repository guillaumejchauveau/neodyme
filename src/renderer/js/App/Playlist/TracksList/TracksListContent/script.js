/**
 * @file Composant TracksListContent.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import VueX from 'vuex'

/**
 * Composant TrackListItem.
 */
import TracksListItem from './TracksListItem'

export default {
  data () {
    const itemAngularHeight = this.$store.state.settings.playlist.tracksList.item.angularHeight

    // Calcule le nombre d'elements entierement affichables.
    let maxItemCount = Math.floor(Math.PI / itemAngularHeight)
    // Ajoute le nombre d'elements partiellement affichables.
    maxItemCount += 1 + (maxItemCount % 2 !== 0)

    return {
      /**
       * Hauteur angulaire d'un element de la liste des pistes (en radians).
       * @type {Number}
       */
      itemAngularHeight,
      /**
       * Nombre d'elements affichables.
       * @type {Number}
       */
      maxItemCount
    }
  },
  computed: {
    ...VueX.mapState('playlist', {
      waypointItemIndex: 'currentTrackIndex'
    }),
    ...VueX.mapGetters('playlist', ['tracksListActive']),
    /**
     * Compile le style dynamique du point de repere.
     * @returns {String} Le contenu de l'attribut style.
     */
    waypointItemStyle () {
      return `transform: translateY(-50%) rotate(${this.computeItemPosition(this.waypointItemIndex) *
      this.itemAngularHeight}rad);`
    }
  },
  methods: {
    /**
     * Calcule la position d'un element par rapport a l'element courant.
     * @param {Number} index - La position absolue.
     * @returns {Number} - La position relative.
     */
    computeItemPosition (index) {
      let distance = index - this.currentItem
      if (Math.abs(distance) > this.maxItemCount) {
        distance = Math.sign(distance) * (this.maxItemCount + 1)
      }

      return distance
    },
    /**
     * Declenche le defilement des elements a l'utilisation de la molette de la souris.
     * @param {MouseEvent} event - L'evenement capture.
     */
    itemsScrollingHandler (event) {
      // 1 ou -1 element en fonction du sens.
      this.$emit('scrollItems', Math.sign(event.deltaY))
    },
    /**
     * Transmet l'evenement trackAction en convertissant la position relative en index de piste.
     * @param {String} action           - L'action a effectuer.
     * @param {Number} relativePosition - La position relative a l'element courant.
     */
    trackActionHandler (action, relativePosition) {
      const index = this.currentItem + relativePosition
      this.$emit('trackAction', action, index)
    }
  },
  components: {
    TracksListItem
  },
  props: {
    /**
     * Index de l'element courant.
     * @type {Number}
     */
    currentItem: {
      type: Number,
      required: true
    }
  }
}
