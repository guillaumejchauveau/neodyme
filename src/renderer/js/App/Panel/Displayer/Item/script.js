/**
 * @file Script du composant 'Item'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import mdcMenu from '../../../../MDC/Menu/index.vue'

/**
 * Classe Criterion.
 * @type {Criterion}
 */
import Criterion from '../../../../Criterion'

export default {
  components: {
    mdcMenu
  },

  props: ['criteriaSet'],

  methods: {
    ...mapActions('panel', ['setNextPanelConfig']),
    ...mapActions('playlist', ['addDecisiveCriteriaSet']),

    ...mapMutations('playlist', {
      clearPlaylist: 'CLEAR_TRACKS',
      setCurrentTrack: 'SET_CURRENT_TRACK'
    }),

    /**
     * Affiche le PanelSuivant en fonction de l'item selectione.
     */
    setNextPanel () {
      this.setNextPanelConfig(this.newCriterion)
    },

    /**
     * Lance la lecture des titres correspondant a l'item selectione.
     */
    play () {
      this.clearPlaylist()
      this.getMatchingDecisiveCriteriaSets(this.criteriaSet).forEach(DCS => {
        this.addDecisiveCriteriaSet(DCS)
      })
      // PLAY
    },

    /**
     * Ajoute après le titre en cours de lecture les titres correspondant a l'item selectione.
     */
    playAfter () {
      this.getMatchingDecisiveCriteriaSets(this.criteriaSet).forEach((DCS, index) => {
        const trackIndex = this.currentTrackIndex + index + 1
        this.addDecisiveCriteriaSet({
          data: DCS,
          index: trackIndex
        })
      })
    },

    /**
     * Ajoute a la liste de lecture les titres correspondant a l'item selectione.
     */
    addToPlaylist () {
      this.getMatchingDecisiveCriteriaSets(this.criteriaSet).forEach(DCS => {
        this.addDecisiveCriteriaSet(DCS)
      })
    }
  },

  computed: {
    ...mapState('playlist', ['currentTrackIndex']),
    ...mapGetters('panel', [
      'getCurrentPanelConfig',
      'getCurrentPanelElements',
      'getNextPanelConfigCriterionType',
      'getConvertedDecisiveCriteriaSets',
      'getSortedDecisiveCriteriaSets',
      'getMatchingDecisiveCriteriaSets'
    ]),

    /**
     * Recupere la valeur de l'item dans le criteriaSet correspondant et si la valeur est nulle renvoit 'Unknow'.
     * @param {CriteriaSet} criteriaSet - Le criteriaSet de l'item.
     * @returns {String} Le nom de l'item a afficher.
     */
    itemName () {
      const itemValue = this.criteriaSet.criteria[this.getCurrentPanelConfig.criterionType].value
      if (itemValue !== '' || undefined || null) {
        return itemValue
      } else {
        return 'Unknow'
      }
    },

    /**
     * Renvoie true si la longueur du texte depasse 15 caracteres.
     * @return {Boolean}
     */
    isScrollingTextEnabled () {
      return this.itemName.length > 15
    },

    /**
     * Recupere la valeur de l'item dans le criteriaSet correspondant.
     * @param {PanelConfig} getCurrentPanelConfig - la configuration du Panel.
     * @param {String} itemName - La 'valeur' de l'item.
     * @returns {Criterion} Le nouveau Criterion a ajouter a la configuration.
     */
    newCriterion () {
      return new Criterion(this.getCurrentPanelConfig.criterionType, this.itemName)
    }
  }
}
