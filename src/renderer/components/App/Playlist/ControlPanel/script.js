/**
 * @file Composant ControlPanel.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import VueX from 'vuex'

/**
 * Mixin App/FormattedTime
 */
import FormattedTimeMixin from '../../FormattedTime'
/**
 * Composant MDC/Menu.
 */
import MDCMenu from '../../../MDC/Menu'
/**
 * Composant MDC/Menu/MenuItem.
 */
import MDCMenuItem from '../../../MDC/Menu/MenuItem'

export default {
  mixins: [FormattedTimeMixin],
  computed: {
    ...VueX.mapState('playlist', ['currentTrackIndex']),
    ...VueX.mapState('playlist/player', ['position', 'duration']),
    ...VueX.mapGetters('playlist', ['tracksCount']),
    ...VueX.mapGetters('playlist/player', ['playerIs']),
    /**
     * Compile le style dynamique de l'indicateur de position.
     * @returns {String|Boolean} Le contenu de l'attribut style.
     */
    positionIndicatorStyle () {
      if (!this.duration) {
        return ''
      }

      return `transform: rotate(${45 + 180 * (this.position / this.duration)}deg);`
    }
  },
  components: {
    'mdc-menu': MDCMenu,
    'mdc-menu-item': MDCMenuItem
  }
}
