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

    Object.assign(newCriteriaSet.criteria, currentPanelConfig.criteriaSet.criteria) //Copie les Criteria de la configuration actuelle vers la nouvelle configuration.
    newCriteriaSet.add(newCriterion)

    const newPanelTitle  = newCriteriaSet.criteria[currentPanelConfig.criterionType].value
    const newPanelConfig = new PanelConfig(newCriteriaSet, nextCriterionType, newPanelTitle)

    //Verifie si la nouvelle configuration se trouve deja dans l'historique.
    if (newPanelConfig === context.state.panelHistory[context.getters.getCurrentPanelConfigHistoryIndex + 1]) {

      // Si oui : set la configuration.
      context.commit('SET_PANELCONFIG', newPanelConfig)
    } else {

      // Si non : efface toutes les entree suivant la configuration actuelle dans l'historique et set la nouvelle configuration.
      context.commit('REMOVE_ALL_PANELHISTORY_ENTRY_BY_INDEX', context.getters.getCurrentPanelConfigHistoryIndex+1)
      context.commit('ADD_PANELHISTORY_ENTRY', currentPanelConfig)
      context.commit('ADD_PANELHISTORY_ENTRY', newPanelConfig)
      context.commit('SET_PANELCONFIG', newPanelConfig)
    }
  },

  /**
   * Set une configuration a partir de l'historique.
   * @param {Number} index - L'index dans l'historique de la configuration a setter.
   */
  setCurrentPanelConfigByHistoryIndex (context, index) {
    context.commit('SET_PANELCONFIG', context.state.panelHistory[index])
  },

  /**
   * Set une configuration personalisee.
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
   */
  loadCurrentPanelElements (context) {
    const currentConfigCriterionType = context.state.currentPanelConfig.criterionType
    const currentConfigCriteriaSet   = context.state.currentPanelConfig.criteriaSet

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
                              throw new Error(reason)
                            })
  }
}
