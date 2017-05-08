/**
 * @file Composant ControlPanel.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import VueX from 'vuex'

/**
 * Composant MDC/Menu.
 */
import MDCMenu from '../../../MDC/Menu'

export default {
  computed: {
    ...VueX.mapState('playlist', ['currentTrackIndex']),
    ...VueX.mapState('playlist/player', ['position', 'duration']),
    ...VueX.mapGetters('playlist', ['tracksCount']),
    ...VueX.mapGetters('playlist/player', ['playerIs']),
    /**
     * Formate un temps en secondes en une chaine de caracteres minutes et secondes.
     * @param {Number} seconds - Le temps a formater (en secondes).
     * @returns {String} La chaine formatee.
     */
    formattedTime () {
      return seconds => {
        let secondsString = seconds % 60 + ''
        let minutesString = Math.trunc(seconds / 60) + ''
        secondsString = (secondsString.length < 2 ? '0' : '') + secondsString
        minutesString = (minutesString.length < 2 ? '0' : '') + minutesString

        return `${minutesString}:${secondsString}`
      }
    },
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
    'mdc-menu': MDCMenu
  }
}
