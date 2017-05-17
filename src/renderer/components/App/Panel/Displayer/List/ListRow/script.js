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

  props: {
    /**
     * L'ensemble de criteres determinants correspondant a la ligne de la liste.
     * @type {DecisiveCriteriaSet}
     */
    element: {
      required: true
    }
  },

  computed: {
    ...mapState('playlist', ['currentTrackIndex']),
    ...mapGetters('playlist', {
      currentTrack: 'currentTrack',
      playerIs: 'player/playerIs'
    }),
    ...mapGetters('panel', ['currentPanelConfig', 'getSelectedListRow']),

    /**
     * Formate la duree du titre d'un temps en secondes en une chaine de caracteres minutes et secondes.
     * @returns {String} La duree formatee.
     */
    formatedDuration () {
      const duration = this.element.criteria.duration.value
      let secondsString = Math.trunc(duration % 60) + ''
      let minutesString = Math.trunc(duration / 60) + ''
      secondsString = (secondsString.length < 2 ? '0' : '') + secondsString
      minutesString = (minutesString.length < 2 ? '0' : '') + minutesString

      return `${minutesString}:${secondsString}`
    },

    /**
     * Verifie si la piste correspond a la piste courante dans la liste de lecture.
     * @returns {Boolean}
     */
    isCurrentTrack () {
      return this.currentTrack === null ? false : this.currentTrack.dcs.id === this.element.id
    },

    /**
     * Verifie le status du player.
     * @param {String} status - Le status a tester
     * @returns {Boolean}
     */
    currentPlayStatus () {
      return status => {
        return this.isCurrentTrack ? this.playerIs(status) : false
      }
    },

    /**
     * Renvoie 'true' si le titre est selectionne.
     * @return {Boolean}
     */
    selected () {
      return this.getSelectedListRow === this.element
    }
  },

  methods: {
    ...mapMutations('panel', ['SET_SELECTEDLISTROW']),
    ...mapActions('playlist', ['addDecisiveCriteriaSet', 'clear', 'play']),
    ...mapActions('panel', ['setCustomPanelConfig']),

    /**
     * Selectionne le titre.
     */
    selectListRow () {
      // Verifie si le titre est en cours de lecture afin d'eviter de selectionner le titre en cours de lecture.
      if (!this.isCurrentTrack) {
        // Si le titre n'est pas en cours de lecture : definit le titre selectionne.
        this.SET_SELECTEDLISTROW(this.element)
      } else {
        this.SET_SELECTEDLISTROW()
      }
    },

    /**
     * Ajoute le titre a la suite du titre en cours dans la liste de lecture.
     */
    playAfter () {
      this.addDecisiveCriteriaSet({
        data: this.element,
        index: this.currentTrackIndex + 1
      })
    },

    /**
     * Ajoute le titre a la liste de lecture.
     */
    addToPlaylist () {
      this.addDecisiveCriteriaSet(this.element)
    },

    /**
     * Affiche le panel de l'album ou de l'artiste du titre.
     * @param {String} type - Le type de critere a affiche (Artiste ou Album).
     */
    setPanelFromCriteria (type) {
      this.setCustomPanelConfig({
        decisiveCriteriaSet: this.element,
        criterionType: type
      })
    }
  }
}
