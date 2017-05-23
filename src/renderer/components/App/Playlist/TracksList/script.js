/**
 * @file Composant TracksList.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import VueX from 'vuex'

/**
 * Composant TrackListContent.
 */
import TracksListContent from './TracksListContent'

export default {
  computed: {
    ...VueX.mapState('playlist', {
      waypointItemIndex: 'currentTrackIndex'
    }),
    ...VueX.mapGetters('playlist', ['tracksCount']),
    ...VueX.mapGetters('playlist/tracksList', ['active', 'currentItem']),
    /**
     * Calcule le nombre d'elements entre l'element courant et le point de repere.
     * @returns {Number} Le nombre d'element.
     */
    distanceToWaypoint () {
      return this.currentItem - this.waypointItemIndex
    },
    /**
     * Calcule l'angle maximum du chariot de defilement.
     * @returns {Number} L'angle (en radians).
     */
    maxWaypointScrollerAngle () {
      const tracksListSize = this.$store.state.settings.playlist.tracksList.size
      const tracksListWaypointScrollerHeight = this.$store.state.settings.playlist.tracksList.waypointScroller.height
      const topDistance = this.$store.state.settings.windowSize.height / 2

      // Si la fenetre n'est pas suffisament haute.
      if ((tracksListSize + tracksListWaypointScrollerHeight) > topDistance) {
        // Calcule l'angle dynamiquement.
        let angle = Math.PI / 2 - Math.acos(topDistance / (tracksListSize + tracksListWaypointScrollerHeight))
        // Enleve la hauteur angulaire du chariot comme marge.
        angle -= this.$store.state.settings.playlist.tracksList.waypointScroller.angularHeight

        return angle
      }

      return this.$store.state.settings.playlist.tracksList.waypointScroller.defaultMaxAngle
    },
    /**
     * Determine si le chariot de defilement doit etre affiche.
     * @returns {Boolean}
     */
    waypointScroller () {
      return this.waypointItemIndex !== -1 &&
        Math.abs(this.waypointScrollerAngle) > this.$store.state.settings.playlist.tracksList.close.angularHeight
    },
    /**
     * Calcule l'angle du chariot de defilement par rapport a la distance entre l'element courant et le point de repere.
     * @returns {Number} L'angle (en radians).
     */
    waypointScrollerAngle () {
      // Calcule le nombre d'element au dessus/en dessous du point de repere.
      const upperItemsCount = this.waypointItemIndex
      const downerItemsCount = this.tracksCount - 1 - this.waypointItemIndex

      // Choisi le plus grand nombre d'element de chaque cotes du point de repere comme reference.
      const distanceRatio = this.distanceToWaypoint /
        ((upperItemsCount > downerItemsCount) ? upperItemsCount : downerItemsCount)

      return distanceRatio * this.maxWaypointScrollerAngle
    },
    /**
     * Compile le style dynamique du chariot de defilement.
     * @returns {String} Le contenu de l'attribut style.
     */
    waypointScrollerContainerStyle () {
      return `transform: translateY(-50%) rotate(${this.waypointScrollerAngle}rad);`
    }
  },
  methods: {
    ...VueX.mapMutations('playlist/tracksList', {
      openTracksList: 'OPEN',
      closeTracksList: 'CLOSE'
    }),
    ...VueX.mapActions('playlist/tracksList', ['setCurrentItem'])
  },
  components: {
    TracksListContent
  }
}
