/**
 * @file Actions du module Panel du Store.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

/**
 * Classe PanelConfig.
 * @type {PanelConfig}
 */
import PanelConfig from '../../PanelConfig'
/**
 * Classe Criterion.
 * @type {Criterion}
 */
import Criterion from '../../Criterion'
/**
 * Classe CriteriaSet.
 * @type {CriteriaSet}
 */
import CriteriaSet from '../../Criterion/CriteriaSet'

/**
 * Module contenant les settings.
 */
import settings from '../Settings'

export default {

  /**
   * Set une configuration du panel personalisee en fonction du type d'argument passe.
   * @param {(String|Number|{decisiveCriteriaSet: DecisiveCriteriaSet, criterionType: String})} payload.
   */
  setCustomPanelConfig (context, payload) {
    // Si l'argument n'est pas un nombre.
    if (typeof payload !== 'number') {
      // Vide l'historique.
      context.commit('CLEAR_PANELHISTORY')

      // Set une configuration a partir d'un ensemble de critere determinants et d'un type de critere.
      if (payload.decisiveCriteriaSet) {
        // Recupere les valeur du payload.
        const {decisiveCriteriaSet, criterionType} = payload

        // Construction de la nouvelle configuration.
        // Le nouvel ensemble de criteres.
        const newCriteriaSet = new CriteriaSet()
        // Le nouveau type de critere.
        const newCriterionType = context.getters.getNextPanelConfigCriterionType(criterionType)
        // Le nouveau titre.
        const newTitle = decisiveCriteriaSet.criteria[criterionType].value
        // Ajout du critere a l'ensemble de critere.
        newCriteriaSet.add(new Criterion(criterionType, newTitle))
        // Nouvelle configuration.
        const newPanelConfig = new PanelConfig(newCriteriaSet, newCriterionType, newTitle)
        // Set la nouvelle configuration.
        context.commit('SET_PANELCONFIG', newPanelConfig)
      }

      // Set un preset de configuration.
      if (typeof payload === 'string') {
        context.commit('SET_PANELCONFIG', settings.state.panel.panelPresets[payload])
      }

      // Ajoute la nouvelle configuration a l'historique.
      context.commit('ADD_PANELHISTORY_ENTRY', context.state.currentPanelConfig)
    } else {
      // Set une configuration a partir d'un index dans l'historique.
      context.commit('SET_PANELCONFIG', context.state.panelHistory[payload])
    }

    // Charge les elements du panel a partir de la configuration.
    context.dispatch('loadCurrentPanelElements')
  },

  /**
   * Set la configuration du panel suivant.
   * @param {Criterion} newCriterion - Le critere a ajouter a la configuration.
   * @throws {TypeError} Lance une exception si le nouveau critere n'est pas reconnu.
   */
  setNextPanelConfig (context, newCriterion) {
    if (!(newCriterion instanceof Criterion)) {
      throw new TypeError('Unrecognized criterion')
    }

    // Configuration actuelle.
    const currentPanelConfig = context.state.currentPanelConfig

    // Construit la nouvelle configuration.
    // Nouvel ensemble de criteres.
    const newCriteriaSet = new CriteriaSet()

    // Nouveau type de critere.
    const nextCriterionType = context.getters.getNextPanelConfigCriterionType(currentPanelConfig.criterionType)

    // Copie l'ensemble de criteres actuel vers le nouvel ensemble de criteres.
    Object.assign(newCriteriaSet.criteria, currentPanelConfig.criteriaSet.criteria)
    // Ajoute le nouveau critere.
    newCriteriaSet.add(newCriterion)

    // Titre de la nouvelle configuration.
    const newPanelTitle = newCriteriaSet.criteria[currentPanelConfig.criterionType].value

    // Nouvelle configuration.
    const newPanelConfig = new PanelConfig(newCriteriaSet, nextCriterionType, newPanelTitle)

    // Configuration suivant la configuration actuelle dans l'historique.
    const nextHistoryPanelConfig = context.state.panelHistory[context.getters.getCurrentPanelConfigHistoryIndex + 1]

    // Verifie si la configuration suivante correspond a la nouvelle configuration.
    if (!newPanelConfig.isEqual(nextHistoryPanelConfig)) {
      // Sinon, efface toutes les entrees suivant la configuration actuelle dans l'historique.
      // Efface toutes les entrees suivant la configuration actuelle dans l'historique.
      context.commit('REMOVE_LASTS_PANELHISTORYENTRIES_TO_INDEX',
        context.getters.getCurrentPanelConfigHistoryIndex + 1)
      // Ajoute la nouvelle configuration a l'historique.
      context.commit('ADD_PANELHISTORY_ENTRY', newPanelConfig)
    }

    // Set la configuration suivante.
    context.commit('SET_PANELCONFIG', newPanelConfig)
    // Met a jour les elements du panel.
    context.dispatch('loadCurrentPanelElements')
  },

  /**
   * Set la configuration du panel precedent.
   */
  setPreviousPanelConfig (context) {
    // Set la configuration precedente.
    context.commit('SET_PANELCONFIG', context.getters.getPreviousPanelConfig)
    // Met a jour les elements du panel.
    context.dispatch('loadCurrentPanelElements')
  },

  /**
   * Action permettant de changer les parametres de tri (type de critere et inversion du tri)
   * et de charger les elements tries avec les nouveaux parametres.
   * @param {String} newSortCriterionType - Le nouveau type de critere de tri.
   */
  setCurrentPanelElementsSorting (context, newSortCriterionType) {
    // Change le type de critere de tri si il a ete a passe en argument.
    if (newSortCriterionType !== undefined) {
      // Desactive l'inversion du tri.
      if (context.getters.isRevertSort) {
        context.commit('TOGGLE_SORT_REVERT')
      }
      // Definit le nouveau type de critere de tri.
      context.commit('SET_CURRENT_PANELCONFIG_ACTIVESORTCRITERIONTYPE', newSortCriterionType)
    } else {
      // Sinon active ou desactive l'inversion du tri.
      context.commit('TOGGLE_SORT_REVERT')
    }

    // Met a jour les elements.
    // Elements courants.
    const elements = context.state.currentPanelElements.decisiveCriteriaSets
    // Elements courants tries selon les nouveaux parametres.
    const sortedElements = context.getters.getSortedDecisiveCriteriaSets(elements)
    // Met a jour les elements du panels
    context.commit('SET_CURRENTPANELELEMENTS', {decisiveCriteriaSets: sortedElements})
  },

  /**
   * Charge les elements (les ensembles de criteres et les ensembles de criteres determinants) du panel
   * en fonction de la configuration du panel.
   * @throws {Error} Lance une exception la recuperation des ensembles de criteres via l'IPC echoue.
   * @throws {Error} Lance une exception la recuperation des ensembles de criteres determinants via l'IPC echoue.
   */
  loadCurrentPanelElements (context) {
    // Type de critere de la configuration.
    const currentConfigCriterionType = context.state.currentPanelConfig.criterionType
    // Ensemble de criteres de la configuration.
    const currentConfigCriteriaSet = context.state.currentPanelConfig.criteriaSet

    // Charge les ensembles de criteres.
    currentConfigCriteriaSet.resolveCriteriaByType(currentConfigCriterionType)
                            .then(criteriaSets => {
                              // Trie les ensembles de criteres.
                              const sortedCriteriaSets = context.getters.getSortedCriteriaSets(criteriaSets)
                              // Met a jour les elements du panel.
                              context.commit('SET_CURRENTPANELELEMENTS', {criteriaSets: sortedCriteriaSets})
                            })
                            .catch(reason => {
                              throw reason
                            })

    // Charge les ensembles de criteres determinants.
    currentConfigCriteriaSet.resolveDecisiveCriteriaSetFootprints()
                            .then(DCSsFootprints => {
                              // Convertit les DecisiveCriteriaSetsFootprints en ensembles de criteres determinants.
                              const DCSs = context.getters.getConvertedDecisiveCriteriaSets(DCSsFootprints)
                              // Trie les ensembles de criteres determinants.
                              const sortedDCSs = context.getters.getSortedDecisiveCriteriaSets(DCSs)
                              // Met a jour les elements du panel.
                              context.commit('SET_CURRENTPANELELEMENTS', {decisiveCriteriaSets: sortedDCSs})
                            })
                            .catch(reason => {
                              throw reason
                            })
  }
}
