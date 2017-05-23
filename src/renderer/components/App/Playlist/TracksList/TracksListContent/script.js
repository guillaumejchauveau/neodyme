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
       * La hauteur angulaire d'un element de la liste des pistes (en radians).
       * @type {Number}
       */
      itemAngularHeight,
      /**
       * Le nombre d'elements affichables.
       * @type {Number}
       */
      maxItemCount
    }
  },
  computed: {
    ...VueX.mapState('playlist', {
      waypointItemIndex: 'currentTrackIndex'
    }),
    ...VueX.mapGetters('playlist/tracksList', ['active', 'currentItem']),
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
    ...VueX.mapActions('playlist/tracksList', ['setCurrentItem']),
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
     * Change l'element courant a l'utilisation de la molette de la souris.
     * @param {MouseEvent} event - L'evenement capture.
     */
    mouseWheelHandler (event) {
      // 1 ou -1 element en plus en fonction du sens de le molette.
      this.setCurrentItem(this.currentItem += Math.sign(event.deltaY))
    }
  },
  components: {
    TracksListItem
  }
}
