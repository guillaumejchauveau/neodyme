/**
 * @file Getters du module Panel du Store.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

/**
 * Classe CriteriaSet.
 * @type {CriteriaSet}
 */
import CriteriaSet from '../../Criterion/CriteriaSet'
/**
 * Classe DecisiveCriteriaSet.
 * @type {DecisiveCriteriaSet}
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
   * Getter: Renvoit le type de critere de tri actif.
   * @return {String} Le type de critere de tri actif.
   */
  getActiveSortCriterionType: state => state.currentPanelConfig.activeSortCriterionType,

  /**
   * Getter revertSort.
   * @return {Boolean}
   */
  isRevertSort: state => state.revertSort,

  /**
   * Verifie si le panel est vide.
   * @return {Boolean}
   */
  isEmptyDisplayer: state => {
    // Recupere le nombre d'ensembles de critere et d'ensembles de critere determinants du panel.
    const criteriaSetsLength = state.currentPanelElements.criteriaSets.length
    const decisiveCriteriaSetsLength = state.currentPanelElements.decisiveCriteriaSets.length

    return (criteriaSetsLength === 0 || decisiveCriteriaSetsLength === 0)
  },

  /**
   * Verifie si la configuration acutelle est la premiere de l'historique.
   * @return {Boolean}
   */
  thereIsPreviousHistoryEntry: state => state.currentPanelConfig !== state.panelHistory[0],

  /**
   * Verifie si la configuration acutelle est la derniere de l'historique.
   * @return {Boolean}
   */
  thereIsNextHistoryEntry: state => state.currentPanelConfig !== state.panelHistory[state.panelHistory.length - 1],

  /**
   * Renvoit l'index de la configuration actuelle dans l'historique.
   * @return {Number} L'index de la position de currentPanelConfig dans panelHistory.
   */
  getCurrentPanelConfigHistoryIndex: (state, getters) => {
    for (let panelConfigIndex = 0; panelConfigIndex < state.panelHistory.length; panelConfigIndex++) {
      const panelConfig = state.panelHistory[panelConfigIndex]
      if (state.currentPanelConfig.isEqual(panelConfig)) {
        return panelConfigIndex
      }
    }
  },

  /**
   * Renvoit la PanelConfig precedente dans l'historique.
   * @return {PanelConfig} La PanelConfig precedente.
   */
  getPreviousPanelConfig: state => state.panelHistory[state.panelHistory.indexOf(state.currentPanelConfig) - 1],

  /**
   * Renvoit le type de critere suivant en fonction du 'panelFlow'.
   * @param {String} panelConfigCriterionType - Le type de critere courant.
   * @return {String} Le type de critere suivant.
   * @throws {TypeError} Lance une exception si le type de critere n'est pas reconu.
   */
  getNextPanelConfigCriterionType: () => panelConfigCriterionType => {
    if (settings.state.criterion.types.indexOf(panelConfigCriterionType) === -1) {
      throw new TypeError('Unrecognized criterionType')
    }

    // Recupere la valeur du type de critere.
    const panelConfigCriterionTypeIndex = settings.state.criterion.types.indexOf(panelConfigCriterionType)
    const panelConfigCriterionTypeFlowLevel = settings.state.panel.panelFlow.indexOf(panelConfigCriterionTypeIndex)

    // Determine le type de critere suivant.
    return settings.state.criterion.types[settings.state.panel.panelFlow[panelConfigCriterionTypeFlowLevel + 1]]
  },

  /**
   * Recupere tout les titres des configurations dans l'historique.
   * @return {Array<String>} Les titres de configurations.
   */
  getHistoryConfigPanelsTitles: state => {
    // La liste des titres de configurations.
    const historyConfigPanelsTitles = []
    // Parcours les configurations de l'historique.
    state.panelHistory.forEach(panelConfig => {
      // Ajoute le titre de la configurations a la liste.
      historyConfigPanelsTitles.push(panelConfig.title)
    })
    return historyConfigPanelsTitles
  },

  /**
   * Convertit les decisiveCriteriaSetFootprints en ensembles de criteres determinants.
   * @param {Array<DecisiveCriteriaSetFootprints>} DCSsFootprints - Les DecisiveCriteriaSetFootprints a convertir.
   * @return {Array<DecisiveCriteriaSet>} Les ensembles de criteres determinants convertis.
   * @throws {TypeError} Lance une exception si la liste de DecisiveCriteriaSetFootprints n'est pas reconnue.
   */
  getConvertedDecisiveCriteriaSets: () => DCSsFootprints => {
    if (typeof DCSsFootprints !== 'object') {
      throw new TypeError('Unrecognized DCSsFootprints')
    }

    // La liste des ensembles de criteres determinants convertis.
    const DCSs = []

    // Parcours les DecisiveCriteriaSetFootprints.
    DCSsFootprints.forEach(DCSFootprints => {
      // Les proprietes de l'ensemble de criteres determinants.
      const DCSProperties = {
        id: DCSFootprints.id,
        providerKey: DCSFootprints.provider.config.key
      }
      // L'ensemble de criteres determinants.
      const DCS = new DecisiveCriteriaSet(DCSProperties)
      DCS.criteria = DCSFootprints.criteria
      // Ajout de ensemble de criteres determinants a la liste.
      DCSs.push(DCS)
    })
    return DCSs
  },

  /**
   * Renvoie la valeur de tri entre 2 ensembles de criteres determinants selon l'ordre des type de criteres de tri.
   * @param {Array<String>} sortCriterionTypeOrder - L'ordre des type de criteres de tri.
   * @param {DecisiveCriteriaSet} dcsA - Le ensemble de criteres determinants A.
   * @param {DecisiveCriteriaSet} dcsB - Le ensemble de criteres determinants B.
   * @return {Number} La comparaison des deux ensemble de criteres determinants.
   * @throws {TypeError} Lance une exception si le type de critere de tri n'est pas reconnu.
   * @throws {TypeError} Lance une exception si au moins un des 2 ensembles de criteres determinants n'est pas reconnu.
   */
  getDCSSortValueBySortCriterionTypeOrder: (state, getters) => (sortCriterionTypeOrder, dcsA, dcsB) => {
    sortCriterionTypeOrder.forEach(sortCriterionType => {
      if (settings.state.criterion.types.indexOf(sortCriterionType) === -1) {
        throw new TypeError('Unrecognized criterionType')
      }
    })
    if (!(dcsA instanceof DecisiveCriteriaSet) && !(dcsB instanceof DecisiveCriteriaSet)) {
      throw new TypeError('Unrecognized decisiveCriteriaSet')
    }

    // Pour chaque type de criteres de tri dans l'ordre de priorite.
    for (let sortCriterionTypeIndex = 0;
      sortCriterionTypeIndex < sortCriterionTypeOrder.length;
      sortCriterionTypeIndex++) {
      // Le type de critere de tri en cours.
      const sortCriterionType = sortCriterionTypeOrder[sortCriterionTypeIndex]

      // Les valeurs des ensemble de criteres determinants A et B selon le type de critere de tri.
      const aValue = dcsA.criteria[sortCriterionType].value
      const bValue = dcsB.criteria[sortCriterionType].value
      // Condition d'invertion du tri.
      const sortReverseCondition = sortCriterionType === getters.getActiveSortCriterionType && state.revertSort
      // Comparaison des deux valeurs.
      // Si les deux valeurs sont egales passe au type de critere de tri suivant.
      // Si non retourne la comparaison des deux valeurs.
      if (aValue < bValue) {
        return sortReverseCondition ? 1 : -1
      }
      if (aValue > bValue) {
        return sortReverseCondition ? -1 : 1
      }
    }
  },

  /**
   * Trie les ensembles de criteres determinants du panel selon le type de critere de tri actif.
   * @param {Array<DecisiveCriteriaSet>} DCSs - Les ensembles de criteres determinants a trier.
   * @return {Array<CriteriaSet>} Les ensembles de criteres determinants tries.
   * @throws {TypeError} Lance une exception si les ensembles de criteres determinants ne sont pas reconnus.
   */
  getSortedDecisiveCriteriaSets: (state, getters) => DCSs => {
    DCSs.forEach(DCS => {
      if (!(DCS instanceof DecisiveCriteriaSet)) {
        throw new TypeError('Unrecognized decisiveCriteriaSet')
      }
    })
    // Le type de critere de tri actif.
    const activeSortCriterionType = getters.getActiveSortCriterionType
    // L'ordre de priorite des types de criteres de tri.
    const sortCriterionTypeOrder = settings.state.panel.sortCriterionTypeOrders[activeSortCriterionType]

    // Tri des ensembles de criteres determinants.
    return DCSs.sort((a, b) => getters.getDCSSortValueBySortCriterionTypeOrder(sortCriterionTypeOrder, a, b))
  },

  /**
   * Trie les ensembles de criteres du panel selon le type de critere affiche.
   * @param {Array<CriteriaSet>} criteriaSets - Les ensembles de criteres a trier.
   * @return {Array<CriteriaSet>} Les ensembles de criteres tries
   * @throws {TypeError} Lance une exception si l'ensemble de criteres n'est pas reconnu.
   */
  getSortedCriteriaSets: state => criteriaSets => {
    criteriaSets.forEach(criteriaSet => {
      if (!(criteriaSet instanceof CriteriaSet)) {
        throw new TypeError('Unrecognized criteriaSet')
      }
    })

    // Le type de critere de tri des ensembles de criteres.
    const currentCriterionType = state.currentPanelConfig.criterionType

    // Tri des ensembles de criteres.
    return criteriaSets.sort((a, b) => {
      // Les valeurs des ensemble de criteres determinants A et B selon le type de critere de tri.
      const aValue = a.criteria[currentCriterionType].value
      const bValue = b.criteria[currentCriterionType].value

      // Comparaison des deux valeurs.
      const AEqualsB = (aValue === bValue) ? 0 : 1
      return (aValue < bValue) ? -1 : AEqualsB
    })
  },

  /**
   * Recupere tout les ensembles de criteres determinants charge dans le panel
   * correspondants a un ensemble de criteres du panel en cours, sans passer par l'IPC.
   * @param {CriteriaSet} criteriaSet - Le ensemble de criteres.
   * @return {Array<DecisiveCriteriaSet>} Les ensembles de criteres determinants correspondants.
   * @throws {TypeError} Lance une exception si l'ensemble de criteres n'est pas reconnu.
   */
  getMatchingDecisiveCriteriaSets: state => criteriaSet => {
    if (!(criteriaSet instanceof CriteriaSet)) {
      throw new TypeError('Unrecognized criteriaSet')
    }

    // Les ensembles de criteres determinants courants.
    let decisiveCriteriaSets = state.currentPanelElements.decisiveCriteriaSets

    // Parcours les types de criteres de l'ensemble de criteres.
    for (const criterionType in criteriaSet.criteria) {
      // Verifie que le type critere est bien une propriete de l'ensemble de criteres.
      if (criteriaSet.criteria.hasOwnProperty(criterionType)) {
        // Le critere dans l'ensemble de criteres.
        const criterion = criteriaSet.criteria[criterionType]
        // La liste des ensembles de criteres determinants selectionnes.
        const selectedDecisiveCriteriaSets = []

        // Parcours les ensembles de criteres determinants du panel.
        decisiveCriteriaSets.forEach(decisiveCriteriaSet => {
          // Verifie si il correspond au critere.
          if (decisiveCriteriaSet.criteria[criterion.type].value === criterion.value) {
            // Ajoute l'ensemble de criteres determinants a la liste des ensembles de criteres determinants retenus.
            selectedDecisiveCriteriaSets.push(decisiveCriteriaSet)
          }
        })

        decisiveCriteriaSets = selectedDecisiveCriteriaSets
      }
    }

    return decisiveCriteriaSets
  }
}
