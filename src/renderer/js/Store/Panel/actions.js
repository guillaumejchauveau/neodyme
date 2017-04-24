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
 * Module contenant les settings.
 */
import settings from '../Settings'

export default {

  /**
   * Set la configuration suivante.
   * @param {Criterion} newCriterion - Le Criterion a ajouter a la configuration.
   */
  setNextPanelConfig (context, newCriterion) {
    const currentPanelConfig = context.state.currentPanelConfig
    const newCriteriaSet = new CriteriaSet()
    const nextCriterionType = context.getters.getNextPanelConfigCriterionType(currentPanelConfig.criterionType)

    Object.assign(newCriteriaSet.criteria, currentPanelConfig.criteriaSet.criteria) //Copie les Criteria de la configuration actuelle vers la nouvelle configuration.
    newCriteriaSet.add(newCriterion)

    const newPanelConfig = new PanelConfig(newCriteriaSet, nextCriterionType)
    context.commit('ADD_PANELHISTORY_ENTRY', currentPanelConfig)
    context.commit('SET_PANELCONFIG', newPanelConfig)
  },

  /**
   * Set la configuration precedente.
   */
  setPreviousPanelConfig (context) {
    context.commit('SET_PANELCONFIG', context.getters.getLastPanelConfig)
    context.commit('REMOVE_LAST_PANELHISTORY_ENTRY')
  },

  /**
   * Set une configuration personnalisee et reset l'historique.
   * @param {PanelConfig} newPanelConfig - La configuration personnalisee.
   */
  setCustomPanel (context, newPanelConfig) {
    context.commit('CLEAR_PANELHISTORY')
    context.commit('SET_PANELCONFIG', newPanelConfig)
  },

  /**
   * Set un panelPreset.
   * @param {String} preset - Le nom du preset.
   */
  setPanelPreset (context, preset) {
    context.commit('CLEAR_PANELHISTORY')
    context.commit('SET_PANELCONFIG', settings.state.panel.panelPresets[preset])
  },

  /**
   * Charge les element du panel en fonction de la configuration.
   */
  loadCurrentPanelElements (context) {
    context.state.currentPanelConfig
                  .criteriaSet
                  .resolveCriteriaByType(context.state.currentPanelConfig.criterionType)
                  .then(criteriaSets => {
                    context.commit('SET_CURRENTPANELELEMENTS', criteriaSets)
                  })
                  .catch(reason => {
                    throw new Error(reason)
                  })

  },
}
