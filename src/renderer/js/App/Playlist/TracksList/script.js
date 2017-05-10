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
  data () {
    return {
      /**
       * Index de l'element courant.
       * @type {Number}
       */
      currentItem: 0,
      /**
       * Suivi du point de repere.
       * @type {Boolean}
       */
      waypointItemTracking: false
    }
  },
  computed: {
    ...VueX.mapState('playlist', {
      waypointItemIndex: 'currentTrackIndex'
    }),
    ...VueX.mapGetters('playlist', ['tracksCount', 'tracksListActive']),
    /**
     * Determine la valeur de l'element courant en prenant en compte l'option de suivi du point de repere.
     * @returns {Number}
     */
    computedCurrentItem () {
      if (this.currentItem === this.waypointItemIndex) {
        this.waypointItemTracking = true
      }
      if (this.waypointItemIndex === -1) {
        this.waypointItemTracking = false
      }

      this.currentItem = this.waypointItemTracking ? this.waypointItemIndex : this.currentItem
      return this.currentItem
    },
    /**
     * Calcule le nombre d'elements entre l'element courant et le point de repere.
     * @returns {Number} Le nombre d'element.
     */
    distanceToWaypoint () {
      return this.computedCurrentItem - this.waypointItemIndex
    },
    /**
     * Calcule l'angle au defilement maximum.
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
    ...VueX.mapMutations({
      openTracksList: 'playlist/OPEN_TRACKS_LIST',
      closeTracksList: 'playlist/CLOSE_TRACKS_LIST'
    }),
    /**
     * Change l'element courant.
     * @param {Number} index
     */
    setCurrentItem (index) {
      this.waypointItemTracking = false
      this.currentItem = index

      // Verifie que la nouvelle valeur soit possible.
      if (this.currentItem < 0) {
        this.currentItem = 0
      }
      if (this.currentItem > this.tracksCount - 1) {
        this.currentItem = this.tracksCount - 1
      }
    },
    /**
     * Fait defiler les elements.
     * @param {Number} amount - Le nombre d'elements a defiler.
     */
    scrollItems (amount) {
      this.setCurrentItem(this.currentItem += amount)
    },
    /**
     * Transmet l'evenement trackAction.
     * @param {String} action - L'action a effectuer.
     * @param {Number} index  - L'index de la piste.
     */
    trackActionHandler (action, index) {
      this.$emit('trackAction', action, index)
    }
  },
  components: {
    TracksListContent
  }
}
