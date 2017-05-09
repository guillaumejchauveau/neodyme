/**
 * @file Getters du module Panel du Store.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

/**
 * Classe DecisiveCriteriaSet.
 * @type {CriteriaSet}
 */
import DecisiveCriteriaSet from '../../Criterion/CriteriaSet/DecisiveCriteriaSet'
/**
 * Module contenant les settings.
 */
import settings from '../Settings'

export default {

  /**
   * Getter CurrentPanelConfig.
   * @return {PanelConfig}
   */
  getCurrentPanelConfig: state => state.currentPanelConfig,

  /**
   * Getter CurrentPanelElements.
   * @return {Array}
   */
  getCurrentPanelElements: state => state.currentPanelElements,

  /**
   * Getter selectedListRow.
   * @return {DecisiveCriteriaSet}
   */
  getSelectedListRow: state => state.selectedListRow,

  /**
   * Getter revertSort.
   * @return {Boolean}
   */
  isRevertSort: state => state.revertSort,

  /**
   * Renvoit l'index de la configuration actuelle dans l'historique.
   * @return {Number} L'index de la position de currentPanelConfig dans panelHistory.
   */
  getCurrentPanelConfigHistoryIndex: state => state.panelHistory.indexOf(state.currentPanelConfig),

  /**
   * Renvoit la PanelConfig precedente dans l'historique.
   * @return {PanelConfig} La PanelConfig precedente.
   */
  getPreviousPanelConfig: state => state.panelHistory[state.panelHistory.indexOf(state.currentPanelConfig) - 1],

  /**
   * Renvoit le type de critere suivant en fonction du 'panelFlow'.
   * @param {String} panelConfigCriterionType - Le type de critere courant.
   * @return {String} Le type de critere suivant.
   */
  getNextPanelConfigCriterionType: () => panelConfigCriterionType => {
    const panelConfigCriterionTypeIndex = settings.state.criterion.types.indexOf(panelConfigCriterionType)
    const panelConfigCriterionTypeFlowLevel = settings.state.panel.panelFlow.indexOf(panelConfigCriterionTypeIndex)
    return settings.state.criterion.types[settings.state.panel.panelFlow[panelConfigCriterionTypeFlowLevel + 1]]
  },

  /**
   * Verifie si la configuration acutelle est la premiere de l'historique.
   * @return {Boolean}
   */
  thereIsPreviousHistoryEntry: state => state.currentPanelConfig === state.panelHistory[0],

  /**
   * Verifie si la configuration acutelle est la derniere de l'historique.
   * @return {Boolean}
   */
  thereIsNextHistoryEntry: state => state.currentPanelConfig === state.panelHistory[state.panelHistory.length - 1],

  /**
   * Recupere tout les titres des PanelConfig dans l'historique.
   * @return {Array<String>} Les titres.
   */
  getHistoryConfigPanelsTitles: state => {
    const historyConfigPanelsTitles = []
    state.panelHistory.forEach(panelConfig => {
      historyConfigPanelsTitles.push(panelConfig.title)
    })
    return historyConfigPanelsTitles
  },

  /**
   * Getter: Renvoit le type de critere de tri actif.
   * @return {String} Le type de critere de tri actif.
   */
  getActiveSortCriterionType: state => {
    if (state.currentPanelConfig.activeSortCriterionType === undefined) {
      return settings.state.panel.defaultActiveSortCriterionType
    } else {
      return state.currentPanelConfig.activeSortCriterionType
    }
  },

  /**
   * Convertit les decisiveCriteriaSetFootprints en DecisiveCriteriaSet.
   * @param {Array<DecisiveCriteriaSetFootprints>} DCSsFootprints - Les DecisiveCriteriaSetFootprints a convertir.
   * @return {Array<DecisiveCriteriaSet>} Les DecisiveCriteriaSet convertis.
   */
  getConvertedDecisiveCriteriaSets: () => DCSsFootprints => {
    const DCSs = []

    DCSsFootprints.forEach(DCSFootprints => {
      const DCSProperties = {
        id: DCSFootprints.id,
        providerKey: DCSFootprints.provider.config.key
      }
      const DCS = new DecisiveCriteriaSet(DCSProperties)
      DCS.criteria = DCSFootprints.criteria
      DCSs.push(DCS)
    })
    return DCSs
  },

  /**
   * Trie les decisiveCriteriaSet du panel selon le type de critere de tri actif.
   * @param {Array<DecisiveCriteriaSet>} DCSs - Les DecisiveCriteriaSet a trier.
   * @return {Array<CriteriaSet>} Les DecisiveCriteriaSet tries
   */
  getSortedDecisiveCriteriaSets: state => DCSs => {
    // Recupere l'ordre de priorite de type de critere de tri depuis les settings.
    const sortCriterionTypePriorityOrder = []
    const sortCriterionTypePriorityOrderIndexes = settings.state.panel.sortCriterionTypePriorityOrder

    sortCriterionTypePriorityOrderIndexes.forEach(index => {
      sortCriterionTypePriorityOrder.push(settings.state.criterion.types[index])
    })

    const revertSort = state.revertSort
    const defaultActiveSortCriterionType = settings.state.panel.defaultActiveSortCriterionType
    let activeSortCriterionType = state.currentPanelConfig.activeSortCriterionType

    if (activeSortCriterionType === undefined) {
      activeSortCriterionType = defaultActiveSortCriterionType
    }

    // Index du type de critere de tri actif dans l'ordre de priorite des types de criteres.
    const activeSortCriterionTypeIndex = sortCriterionTypePriorityOrder.indexOf(activeSortCriterionType)

    // Tri des DecisiveCriteriaSets
    return DCSs.sort((a, b) => {
      const sortCriterionType = sortCriterionTypePriorityOrder[activeSortCriterionTypeIndex]
      const aValue = a.criteria[sortCriterionType].value
      const bValue = b.criteria[sortCriterionType].value

      if (aValue < bValue) {
        return revertSort ? 1 : -1
      }
      if (aValue > bValue) {
        return revertSort ? -1 : 1
      }

      return activeSortCriterionTypeIndex === sortCriterionTypePriorityOrder.length - 1 ? 0 : null
    })
  },

  /**
   * Trie les criteriaSet du panel selon le type de critere affiche.
   * @param {Array<CriteriaSet>} criteriaSets - Les CriteriaSet a trier.
   * @return {Array<CriteriaSet>} Les CriteriaSet tries
   */
  getSortedCriteriaSets: state => criteriaSets => {
    const currentCriterionType = state.currentPanelConfig.criterionType

    return criteriaSets.sort((a, b) => {
      const aValue = a.criteria[currentCriterionType].value
      const bValue = b.criteria[currentCriterionType].value
      const AEqualsB = (aValue === bValue) ? 0 : 1
      return (aValue < bValue) ? -1 : AEqualsB
    })
  },

  /**
   * Recupere tout les DecisiveCriteriaSet charge dans le panel correspondants a un criteriaSet du panel en cours, sans
   * passer par l'IPC.
   * @param {CriteriaSet} criteriaSet - Le CriteriaSet.
   * @return {Array<DecisiveCriteriaSet>} Les DecisiveCriteriaSet correspondants.
   */
  getMatchingDecisiveCriteriaSets: state => criteriaSet => {
    let decisiveCriteriaSets = state.currentPanelElements.decisiveCriteriaSets

    for (const criterionType in criteriaSet.criteria) {
      if (criteriaSet.criteria.hasOwnProperty(criterionType)) {
        const criterion = criteriaSet.criteria[criterionType]
        const selectedDecisiveCriteriaSets = []

        decisiveCriteriaSets.forEach(decisiveCriteriaSet => {
          if (decisiveCriteriaSet.criteria[criterion.type].value === criterion.value) {
            selectedDecisiveCriteriaSets.push(decisiveCriteriaSet)
          }
        })

        decisiveCriteriaSets = selectedDecisiveCriteriaSets
      }
    }

    return decisiveCriteriaSets
  }
}
