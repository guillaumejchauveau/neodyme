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
    ...mapGetters('playlist', ['currentTrack']),
    ...mapState('panel', ['currentPanelConfig']),

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
    isCurrentPlay () {
      if (this.currentTrack === null) {
        return false
      } else {
        return this.currentTrack.dcs.id === this.element.id
      }
    },
  },

  methods: {
    ...mapMutations('playlist', ['CLEAR_TRACKS']),
    ...mapActions('playlist', ['addDecisiveCriteriaSet']),
    ...mapActions('panel', ['loadCurrentPanelElements', 'setCustomPanelConfig']),

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
      if (this.currentTrack === null) {
        this.addToPlaylist()
      } else {
        this.addDecisiveCriteriaSet({
          data: this.element,
          index: this.currentTrack
        })
      }
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
  }
}
