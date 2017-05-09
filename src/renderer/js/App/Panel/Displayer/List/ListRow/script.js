/**
 * @file Script du composant 'ListRow'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

/**
 * Composant MDC/Menu.
 */
import MDCMenu from '../../../../../MDC/Menu'
/**
 * Composant MDC/Menu/MenuItem.
 */
import MDCMenuItem from '../../../../../MDC/Menu/MenuItem'

export default {
  name: 'listrow',
  components: {
    'mdc-menu': MDCMenu,
    'mdc-menu-item': MDCMenuItem
  },

  props: ['element'],

  computed: {
    ...mapState('playlist', ['currentTrackIndex']),
    ...mapGetters('playlist', {
      currentTrack: 'currentTrack',
      playerIs: 'player/playerIs'
    }),
    ...mapGetters('panel', ['currentPanelConfig', 'getSelectedListRow']),

    /**
     * Formate un temps en secondes en une chaine de caracteres minutes et secondes.
     * @returns {String} La chaine formatee.
     */
    formattedTime () {
      return seconds => {
        let secondsString = Math.trunc(seconds % 60) + ''
        let minutesString = Math.trunc(seconds / 60) + ''
        secondsString = (secondsString.length < 2 ? '0' : '') + secondsString
        minutesString = (minutesString.length < 2 ? '0' : '') + minutesString

        return `${minutesString}:${secondsString}`
      }
    },

    /**
     * Renvoie true si le titre est en cours de lecture.
     * @returns {Boolean}
     */
    currentPlayStatus () {
      if (this.currentTrack === null ? false : this.currentTrack.dcs.id === this.element.id) {
        return this.playerIs('PLAYING') ? 'play' : 'pause'
      }
      return null
    },

    isPause () {
      return !this.playerIs('PLAYING')
    },

    selected () {
      return this.getSelectedListRow === this.element
    }
  },

  methods: {
    ...mapMutations('panel', ['SET_SELECTEDLISTROW']),
    ...mapActions('playlist', ['addDecisiveCriteriaSet', 'clear', 'play']),
    ...mapActions('panel', ['setCustomPanelConfig']),

    selectListRow () {
      if (this.currentPlayStatus === null) {
        this.SET_SELECTEDLISTROW(this.element)
      }
    },

    /**
     * Ajoute le titre a la suite du titre en cours dans la playlist.
     */
    playAfter () {
      this.addDecisiveCriteriaSet({
        data: this.element,
        index: this.currentTrackIndex + 1
      })
    },

    /**
     * Ajoute le titre a la playlist.
     */
    addToPlaylist () {
      this.addDecisiveCriteriaSet(this.element)
    },

    /**
     * Affiche le panel de l'album du titre.
     */
    setPanelFromCriteria (type) {
      this.setCustomPanelConfig({
        decisiveCriteriaSet: this.element,
        criterionType: type
      })
    }
  }
}
