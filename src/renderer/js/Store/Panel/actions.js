/**
 * @file Actions du module Panel du Store.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

/**
* Classe PanelConfig.
* @type {PanelConfig}
*/
import PanelConfig from '../../Panel/PanelConfig'
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
   * Set la configuration suivante.
   * @param {Criterion} newCriterion - Le Criterion a ajouter a la configuration.
   */
  setNextPanelConfig (context, newCriterion) {

    //Construit la nouvelle configuration.
    const currentPanelConfig = context.state.currentPanelConfig
    const newCriteriaSet     = new CriteriaSet()
    const nextCriterionType  = context.getters.getNextPanelConfigCriterionType(currentPanelConfig.criterionType)

    //Copie les Criteria de la configuration actuelle vers la nouvelle configuration.
    Object.assign(newCriteriaSet.criteria, currentPanelConfig.criteriaSet.criteria)
    newCriteriaSet.add(newCriterion)

    const newPanelTitle  = newCriteriaSet.criteria[currentPanelConfig.criterionType].value
    const newPanelConfig = new PanelConfig(newCriteriaSet, nextCriterionType, newPanelTitle)

    //Verifie si la nouvelle configuration se trouve deja dans l'historique.
<<<<<<< HEAD
    if (newPanelConfig === context.state.panelHistory[context.getters.getCurrentPanelConfigHistoryIndex]) {
=======
    if (newPanelConfig === context.state.panelHistory[context.getters.getCurrentPanelConfigHistoryIndex + 1]) {
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127

      // Si oui : set la configuration.
      context.commit('SET_PANELCONFIG', newPanelConfig)
    } else {

      // Si non : efface toutes les entree suivant la configuration actuelle dans l'historique et set la nouvelle configuration.
<<<<<<< HEAD
      context.commit('REMOVE_LASTS_PANELHISTORYENTRIES_TO_INDEX', context.getters.getCurrentPanelConfigHistoryIndex + 2)
      context.commit('ADD_PANELHISTORY_ENTRY', newPanelConfig)
      context.commit('SET_PANELCONFIG', newPanelConfig)
      context.dispatch('loadCurrentPanelElements')
=======
      context.commit('REMOVE_ALL_PANELHISTORY_ENTRY_BY_INDEX', context.getters.getCurrentPanelConfigHistoryIndex+1)
      context.commit('ADD_PANELHISTORY_ENTRY', currentPanelConfig)
      context.commit('ADD_PANELHISTORY_ENTRY', newPanelConfig)
      context.commit('SET_PANELCONFIG', newPanelConfig)
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
    }
  },

  /**
   * Set une configuration a partir de l'historique.
   * @param {Number} index - L'index dans l'historique de la configuration a setter.
   */
<<<<<<< HEAD
  setPreviousPanelConfig (context) {
    context.commit('SET_PANELCONFIG', context.getters.getPreviousPanelConfig)
    context.dispatch('loadCurrentPanelElements')
=======
  setCurrentPanelConfigByHistoryIndex (context, index) {
    context.commit('SET_PANELCONFIG', context.state.panelHistory[index])
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
  },

  /**
   * Set une configuration personalisee.
<<<<<<< HEAD
   * @param {(PanelConfig|String|Number|{decisiveCriteriaSet: DecisiveCriteriaSet, criterionType: String})} panelConfig
   */
  setCustomPanelConfig (context, payload) {
    if (typeof payload !== 'number') {
      context.commit('CLEAR_PANELHISTORY')

      // Set une la configuration a partir d'un decisiveCriteriaSet et d'un type de critere.
      if (payload.decisiveCriteriaSet) {
        const decisiveCriteriaSet = payload.decisiveCriteriaSet
        const criterionType       = payload.criterionType

        const newCriteriaSet   = new CriteriaSet()
        const newCriterionType = context.getters.getNextPanelConfigCriterionType(criterionType)
        const newTitle         = decisiveCriteriaSet.criteria[criterionType].value

        newCriteriaSet.add(new Criterion(criterionType, newTitle))

        const newPanelConfig = new PanelConfig(newCriteriaSet , newCriterionType, newTitle)

        context.commit('SET_PANELCONFIG', newPanelConfig)
      }

      // Set un preset de configuration.
      if (typeof payload === 'string') {
        context.commit('SET_PANELCONFIG', settings.state.panel.panelPresets[payload])
      }
      
      context.commit('ADD_PANELHISTORY_ENTRY', context.state.currentPanelConfig)

    // Set une configuration a partir d'un index dans l'historique.
    } else {
      context.commit('SET_PANELCONFIG', context.state.panelHistory[payload])
    }

    // Charge les elements du panel a partir de la configuration.
    context.dispatch('loadCurrentPanelElements')
  },

  /**
   * Action permettant de changer les les parametres de tri (type de critere et inversion du tri)
   * et de charger les elements tries avec les nouveaux parametres.
   * @param {String} newSortCriteriaType - Le nouveau type de critere de tri.
   */
  setCurrentPanelElementsSorting (context, newSortCriteriaType) {

    // Change le type de critere de tri si il a ete a passe en argument.
    if (newSortCriteriaType !== undefined) {
      if (context.getters.isRevertSort) {
        context.commit('TOGGLE_SORT_REVERT')
      }
      context.commit('SET_CURRENT_PANELCONFIG_ACTIVESORTCRITERIONTYPE', newSortCriteriaType)
    } else {
      // Sinon active ou desactive l'inversion du tri.
      context.commit('TOGGLE_SORT_REVERT')
    }

    // Met a jour les elements.
    const elements = context.state.currentPanelElements.decisiveCriteriaSets
    const sortedElements = context.getters.getSortedDecisiveCriteriaSets(elements)
    context.commit('SET_CURRENTPANELELEMENTS', {decisiveCriteriaSets: sortedElements})
    context.dispatch('loadCurrentPanelElements')
  },

  /**
   * Charge les éléments du panel pour tout les types d'affichage en cours (items ou liste) en fonction de la configuration du panel courante.
=======
   * @param {PanelConfig} panelConfig - La configuration personalisee.
   */
  setCustomPanelConfig (context, panelConfig) {
    context.commit('CLEAR_PANELHISTORY')
    context.commit('SET_PANELCONFIG', panelConfig)
    context.commit('ADD_PANELHISTORY_ENTRY', context.state.currentPanelConfig)
  },

  /**
   * Set la configuration precedente.
   */
  setPreviousPanelConfig (context) {
    context.commit('SET_PANELCONFIG', context.getters.getLastPanelConfig)
  },

  /**
   * Set un panelPreset et reset l'historique.
   * @param {String} preset - Le nom du preset.
   */
  setPanelPreset (context, preset) {
    context.commit('CLEAR_PANELHISTORY')
    context.commit('SET_PANELCONFIG', settings.state.panel.panelPresets[preset])
    context.commit('ADD_PANELHISTORY_ENTRY', settings.state.panel.panelPresets[preset])
  },

  /**
   * Charge les éléments du panel pour le type d'affichage en cours (items ou liste) en fonction de la configuration du panel courante.
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
   */
  loadCurrentPanelElements (context) {
    const currentConfigCriterionType = context.state.currentPanelConfig.criterionType
    const currentConfigCriteriaSet   = context.state.currentPanelConfig.criteriaSet
<<<<<<< HEAD

    // Charge les elements de type 'liste'.
    currentConfigCriteriaSet.resolveDecisiveCriteriaSetFootprints()
                            .then( DCSsFootprints => {
                              // Convertit les DecisiveCriteriaSetsFootprints en DecisiveCriteriaSets.
                              const DCSs = context.getters.getConvertedDecisiveCriteriaSets(DCSsFootprints)
                              //Trie les DecisiveCriteriaSets.
                              const sortedDCSs = context.getters.getSortedDecisiveCriteriaSets(DCSs)
                              // Met a jour les elements du panel.
                              context.commit('SET_CURRENTPANELELEMENTS', {decisiveCriteriaSets: sortedDCSs})
                            })
                            .catch( reason => {
                              throw new Error(reason)
                            })
    // Charge les elements de type 'item'.
    currentConfigCriteriaSet.resolveCriteriaByType(currentConfigCriterionType)
                            .then( criteriaSets => {
                              //Trie les CriteriaSets.
                              const sortedCriteriaSets = context.getters.getSortedCriteriaSets(criteriaSets)
                              // Met a jour les elements du panel.
                              context.commit('SET_CURRENTPANELELEMENTS', {criteriaSets: sortedCriteriaSets})
                            })
                            .catch( reason => {
=======

    // Verifie si l'affichage courant est un affichage de type 'liste'.
    if (currentConfigCriterionType === 'title') {
      currentConfigCriteriaSet.resolveDecisiveCriteriaSetFootprints()
                              .then(DCSsFootprints => {

                                // Convertit les DecisiveCriteriaSetsFootprints en DecisiveCriteriaSets.
                                const DCSs = []
                                DCSsFootprints.forEach( DCSFootprints => {
                                  const DCSProperties = {
                                    id          : DCSFootprints.id,
                                    providerKey : DCSFootprints.provider.config.key
                                  }
                                  const DCS    = new DecisiveCriteriaSet(DCSProperties)
                                  DCS.criteria = DCSFootprints.criteria
                                  DCSs.push(DCS)
                                })

                                // Met a jour les elements du panel.
                                context.commit('SET_CURRENTPANEL_DECISIVECRITERIASETS', DCSs)
                              })
                              .catch(reason => {
                                throw new Error(reason)
                              })

    // Verifie si l'affichage courant est un affichage de type 'items'.
    } else if (currentConfigCriterionType === 'album' || 'artist') {
      currentConfigCriteriaSet.resolveCriteriaByType(currentConfigCriterionType)
                              .then(criteriaSets => {

                                // Met a jour les elements du panel.
                                context.commit('SET_CURRENTPANEL_CRITERIASETS', criteriaSets)
                              })
                              .catch(reason => {
                                throw new Error(reason)
                              })
    }
  },

  /**
   * Charge les éléments du panel pour tout les types d'affichage en cours (items ou liste) en fonction de la configuration du panel courante.
   */
  forceLoadCurrentPanelElements (context) {
    const currentConfigCriterionType = context.state.currentPanelConfig.criterionType
    const currentConfigCriteriaSet   = context.state.currentPanelConfig.criteriaSet

    // Charge les elements de type 'liste'.
    currentConfigCriteriaSet.resolveDecisiveCriteriaSetFootprints()
                            .then(DCSsFootprints => {

                              // Convertit les DecisiveCriteriaSetsFootprints en DecisiveCriteriaSets.
                              const DCSs = []
                              DCSsFootprints.forEach( DCSFootprints => {
                                const DCSProperties = {
                                  id          : DCSFootprints.id,
                                  providerKey : DCSFootprints.provider.config.key
                                }
                                const DCS    = new DecisiveCriteriaSet(DCSProperties)
                                DCS.criteria = DCSFootprints.criteria
                                DCSs.push(DCS)
                              })

                              // Met a jour les elements du panel.
                              context.commit('SET_CURRENTPANEL_DECISIVECRITERIASETS', DCSs)
                            })
                            .catch(reason => {
                              throw new Error(reason)
                            })

    // Charge les elements de type 'item'.
    currentConfigCriteriaSet.resolveCriteriaByType(currentConfigCriterionType)
                            .then(criteriaSets => {

                              // Met a jour les elements du panel.
                              context.commit('SET_CURRENTPANEL_CRITERIASETS', criteriaSets)
                            })
                            .catch(reason => {
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
                              throw new Error(reason)
                            })
  }
}
