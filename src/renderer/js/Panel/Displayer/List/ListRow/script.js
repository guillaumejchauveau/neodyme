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
<<<<<<< HEAD
    ...mapState('playlist', ['currentTrackIndex', 'currentTrack']),
    ...mapGetters('playlist', {currentTrack: 'currentTrack',
                               playerIs: 'player/playerIs'}),
    ...mapGetters('panel', ['currentPanelConfig', 'getSelectedListRow']),
=======
    ...mapGetters('playlist', ['currentTrack']),
    ...mapState('panel', ['currentPanelConfig']),
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127

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
<<<<<<< HEAD
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
=======
    isCurrentPlay () {
      if (this.currentTrack === null) {
        return false
      } else {
        return this.currentTrack.dcs.id === this.element.id
      }
    },
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
  },

  methods: {
    ...mapMutations('playlist', ['CLEAR_TRACKS']),
<<<<<<< HEAD
    ...mapMutations('panel', ['SET_SELECTEDLISTROW']),
    ...mapActions('playlist', ['addDecisiveCriteriaSet']),
    ...mapActions('panel', ['setCustomPanelConfig']),

    selectListRow () {
      if (this.currentPlayStatus === null) {
        this.SET_SELECTEDLISTROW(this.element)
      }
    },
=======
    ...mapActions('playlist', ['addDecisiveCriteriaSet']),
    ...mapActions('panel', ['loadCurrentPanelElements', 'setCustomPanelConfig']),
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127

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
<<<<<<< HEAD
      this.addDecisiveCriteriaSet({
        data: this.element,
        index: this.currentTrackIndex +1
      })
=======
      if (this.currentTrack === null) {
        this.addToPlaylist()
      } else {
        this.addDecisiveCriteriaSet({
          data: this.element,
          index: this.currentTrack
        })
      }
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
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
<<<<<<< HEAD
     setPanelFromCriteria (type) {
       this.setCustomPanelConfig({decisiveCriteriaSet: this.element,
                                        criterionType: type
        })
     }
=======
    setPanelToAlbum () {
      const newCriteriaSet = new CriteriaSet()
      const newTitle       = this.element.criteria.album.value

      newCriteriaSet.add(new Criterion('album', newTitle))

      const newPanelConfig = new PanelConfig(newCriteriaSet ,'title', newTitle) //Nouvelle configuration du panel

      //Remplacement de la configuration du panel
      this.setCustomPanelConfig(newPanelConfig)
      //Chargement des elements du panel
      this.loadCurrentPanelElements()
    },

    /**
     * Affiche le panel de l'artiste du titre.
     */
    setPanelToArtist () {
      const newCriteriaSet = new CriteriaSet()
      const newTitle       = this.element.criteria.artist.value

      newCriteriaSet.add(new Criterion('artist', newTitle))

      const newPanelConfig = new PanelConfig(newCriteriaSet ,'album', newTitle) //Nouvelle configuration du panel

      //Remplacement de la configuration du panel
      this.setCustomPanelConfig(newPanelConfig)
      //Chargement des elements du panel
      this.loadCurrentPanelElements()
    }
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
  }
}
