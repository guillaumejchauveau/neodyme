/**
 * @file Script du composant 'ListRow'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import {mapGetters, mapMutations, mapActions, mapState} from 'vuex'

import MdcMenu from '../../../../MDC/Menu'

/**
 * Classe Criterion.
 * @type {Criterion}
 */
import Criterion from '../../../../Criterion'
/**
 * Classe CriteriaSet.
 * @type {CriteriaSet}
 */
import CriteriaSet from '../../../../Criterion/CriteriaSet'
/**
 * Classe DecisiveCriteriaSet.
 * @type {DecisiveCriteriaSet}
 */
import DecisiveCriteriaSet from '../../../../Criterion/CriteriaSet/DecisiveCriteriaSet'
/**
 * Classe PanelConfig.
 * @type {PanelConfig}
 */
import PanelConfig from '../../../PanelConfig'

export default {
  props: ['element'],

  components: {
    MdcMenu
  },

  computed: {
    ...mapState('playlist', ['currentTrackIndex', 'currentTrack']),
    ...mapGetters('playlist', {currentTrack: 'currentTrack',
                               playerIs: 'player/playerIs'}),
    ...mapGetters('panel', ['currentPanelConfig', 'getSelectedListRow']),

    /**
     * Formate un temps en secondes en une chaine de caracteres minutes et secondes.
     * @returns {String} La chaine formatee.
     */
    formattedTime() {
        return seconds => {
            let minutes = Math.trunc(seconds / 60) + ''
            seconds     = Math.trunc(seconds % 60) + ''
            minutes     = minutes.length < 2 ? `0${minutes}` : minutes
            seconds     = seconds.length < 2 ? `0${seconds}` : seconds

            return `${minutes}:${seconds}`
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
      console.log(!this.playerIs('PLAYING'))
      return !this.playerIs('PLAYING')
    },

    selected () {
      return this.getSelectedListRow === this.element
    }
  },

  methods: {
    ...mapMutations('playlist', ['CLEAR_TRACKS']),
    ...mapMutations('panel', ['SET_SELECTEDLISTROW']),
    ...mapActions('playlist', ['addDecisiveCriteriaSet']),
    ...mapActions('panel', ['setCustomPanelConfig']),

    selectListRow () {
      if (this.currentPlayStatus === null) {
        this.SET_SELECTEDLISTROW(this.element)
      }
    },

    /**
     * Vide la liste de lecture et ajoute le titre a celle ci.
     */
    play () {
      //STOP
      this.CLEAR_TRACKS()
      this.addDecisiveCriteriaSet(this.element)
      //PLAY
    },

    /**
     * Ajoute le titre a la suite du titre en cours dans la playlist.
     */
    playAfter () {
      this.addDecisiveCriteriaSet({
        data: this.element,
        index: this.currentTrackIndex +1
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
       this.setCustomPanelConfig({decisiveCriteriaSet: this.element,
                                        criterionType: type
        })
     }
  }
}
