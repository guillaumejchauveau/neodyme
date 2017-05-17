/**
 * @file Script du composant 'Item'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import { mapState, mapGetters, mapActions } from 'vuex'

/**
 * Composant MDC/Menu.
 */
import MDCMenu from '../../../../MDC/Menu'
/**
 * Composant MDC/Menu/MenuItem.
 */
import MDCMenuItem from '../../../../MDC/Menu/MenuItem'

/**
 * Classe Criterion.
 * @type {Criterion}
 */
import Criterion from '../../../../../js/Criterion'

export default {
  name: 'item',
  components: {
    'mdc-menu': MDCMenu,
    'mdc-menu-item': MDCMenuItem
  },

  props: {
    /**
     * Ensemble de criteres correspondant a l'item.
     * @type {CriteriaSet}
     */
    criteriaSet: {
      required: true
    }
  },

  data () {
    return {
      /**
       * La duree de defilement du texte de l'item.
       * @type {Number}
       */
      itemTextScrollingDuration: 0
    }
  },

  methods: {
    ...mapActions('panel', ['setNextPanelConfig']),
    ...mapActions('playlist', ['addDecisiveCriteriaSet', 'clear', 'play']),

    /**
     * Affiche le Panel correspondant a l'item.
     */
    setNextPanel () {
      this.setNextPanelConfig(this.newCriterion)
    },

    /**
     * Lance la lecture des titres correspondant a l'item.
     * @throws {Error} Lance une exception si l'effacement de la liste de lecture echoue.
     * @throws {Error} Lance une exception si le lancement de la lecture echoue.
     */
    playNow () {
      // Arrete et efface la liste de lecture.
      this.clear()
          .then(() => {
            // Recupere et ajoute les ensembles de criteres determinants correspondant a l'item a la liste de lecture.
            this.getMatchingDecisiveCriteriaSets(this.criteriaSet)
                .forEach(decisiveCriteriaSet => {
                  this.addDecisiveCriteriaSet(decisiveCriteriaSet)
                })
            // Lance la lecture.
            this.play()
                .catch(reason => {
                  throw reason
                })
          })
          .catch(reason => {
            throw reason
          })
    },

    /**
     * Ajoute après le titre en cours de lecture les titres correspondants a l'item.
     */
    playAfter () {
      // Recupere et ajoute les ensembles de criteres determinants correspondant a l'item a la liste de lecture.
      this.getMatchingDecisiveCriteriaSets(this.criteriaSet)
          .forEach((decisiveCriteriaSet, index) => {
            // Index dans la liste de lecture ou ajouter l'ensemble de criteres determinants.
            const trackIndex = this.currentTrackIndex + index + 1
            // Ajoute chaque ensemble de criteres determinants a la liste de lecture apres le titre en court.
            this.addDecisiveCriteriaSet({
              data: decisiveCriteriaSet,
              index: trackIndex
            })
          })
    },

    /**
     * Ajoute a la liste de lecture les titres correspondant a l'item.
     */
    addToPlaylist () {
      // Recupere et ajoute les ensembles de criteres determinants correspondant a l'item a la liste de lecture.
      this.getMatchingDecisiveCriteriaSets(this.criteriaSet)
          .forEach(decisiveCriteriaSet => {
            this.addDecisiveCriteriaSet(decisiveCriteriaSet)
          })
    }
  },

  computed: {
    ...mapState('playlist', ['currentTrackIndex']),
    ...mapGetters('panel', [
      'getCurrentPanelConfig',
      'getCurrentPanelElements',
      'getMatchingDecisiveCriteriaSets'
    ]),

    /**
     * Recupere le nom de l'item dans l'ensemble de criteres de l'item,
     * et gere les problemes de syncronicite au changement de panel.
     * @return {String} Le nom de l'item.
     */
    itemName () {
      try {
        return this.criteriaSet.criteria[this.getCurrentPanelConfig.criterionType].value
      } catch (e) {
        return ''
      }
    },

    /**
     * Definit si le texte depasse de l'item et donc doit defiler au survol de l'item.
     * @return {Boolean}
     */
    isScrollingTextEnabled () {
      return this.itemName.length > 15
    },

    /**
     * Definit le critere correspondant a l'item.
     * @param {PanelConfig} getCurrentPanelConfig - la configuration du Panel.
     * @param {String} itemName - La 'valeur' de l'item.
     * @returns {Criterion} Le nouveau critere a ajouter a la configuration.
     */
    newCriterion () {
      const itemValue = this.criteriaSet.criteria[this.getCurrentPanelConfig.criterionType].value
      const itemType = this.getCurrentPanelConfig.criterionType
      return new Criterion(itemType, itemValue)
    }
  },

  /**
   * Fonction lancee quand le composant est monte,
   * recupere la longueur en pixel du nom de l'item et calcule la duree de l'animation de defilement.
   */
  mounted () {
    if (this.isScrollingTextEnabled) {
      // 30px/s : Vitesse de defilement.
      this.itemTextScrollingDuration = this.$refs.scrollableText.clientWidth / 30
    }
  }
}
