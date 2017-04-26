/**
 * @file Script du composant 'Item'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import { mapGetters, mapActions, mapState, mapMutations} from 'vuex'

import mdcMenu from '../../../MDC/Menu/index.vue'

/**
 * Classe Criterion.
 * @type {Criterion}
 */
import Criterion from '../../../Criterion'
/**
 * Classe CriteriaSet.
 * @type {CriteriaSet}
 */
import CriteriaSet from '../../../Criterion/CriteriaSet'

export default {
  components: {
    mdcMenu,
  },

  props: ['criteriaSet'],

  methods: {
    ...mapActions ('panel', {
      setNextPanelConfig: 'setNextPanelConfig',
      loadCurrentPanelElements: 'loadCurrentPanelElements'
    }),
    ...mapActions ('playlist', {
      addCriteriaSets: 'addCriteriaSets'
    }),
    ...mapMutations ('playlist', {
      clearPlaylist: 'CLEAR_TRACKS',
      setCurrentTrack: 'SET_CURRENT_TRACK'
    }),

    /**
     * Affiche le PanelSuivant en fonction de l'item selectione.
     */
    setNextPanel () {
      this.setNextPanelConfig(this.newCriterion)
      this.loadCurrentPanelElements()
    },

    /**
     * Lance la lecture des titres correspondant a l'item selectione.
     */
    play () {
      this.clearPlaylist()
      this.addCriteriaSets(this.criteriaSet)
      //PLAY
    },

    /**
     * Ajoute après le titre en cours de lecture les titres correspondant a l'item selectione.
     */
    playAfter () {
      this.addCriteriaSets({
        data: this.criteriaSet,
        index: this.currentTrack
      })
    },

    /**
     * Ajoute a la liste de lecture les titres correspondant a l'item selectione.
     */
    addToPlaylist () {
      this.addCriteriaSets(this.criteriaSet)
    },
  },

  computed: {
    ...mapState('panel', ['currentPanelConfig']),
    ...mapGetters('panel', {
      getNextPanelConfigCriterionType: 'getNextPanelConfigCriterionType'
    }),
    ...mapGetters('playlist', {
      currentTrack: 'currentTrack'
    }),

    /**
     * Recupere la valeur de l'item dans le criteriaSet correspondant et si la valeur est nulle renvoit 'Unknow'.
     * @param {CriteriaSet} criteriaSet - Le criteriaSet de l'item.
     * @returns {String} Le nom de l'item a afficher.
     */
    itemName () {
      const itemValue = this.criteriaSet.criteria[this.currentPanelConfig.criterionType].value
      if (itemValue !== '' || undefined || null) {
        return itemValue
      } else {
        return 'Unknow'
      }
    },

    /**
     * Recupere la valeur de l'item dans le criteriaSet correspondant.
     * @param {PanelConfig} currentPanelConfig - la configuration du Panel.
     * @param {String} itemName - La 'valeur' de l'item.
     * @returns {Criterion} Le nouveau Criterion a ajouter a la configuration.
     */
    newCriterion () {
      return new Criterion(this.currentPanelConfig.criterionType, this.itemName)
    },
  }
}
