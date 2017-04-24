/**
 * @file Getters du module Panel du Store.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

 /**
  * Module contenant les settings.
  */
import settings from '../Settings'

export default {

  /**
   * Renvoit le type de critere suivant en fonction du 'panelFlow'.
   * @param {String} panelConfigCriterionType - Le type de critere courant.
   * @return {String} Le type de critere suivant.
   */
  getNextPanelConfigCriterionType: state => panelConfigCriterionType => {
    const panelConfigCriterionTypeIndex = settings.state.criterion.types.indexOf(panelConfigCriterionType)
    const panelConfigCriterionTypeFlowLevel = settings.state.panel.panelFlow.indexOf(panelConfigCriterionTypeIndex)
    return settings.state.criterion.types[settings.state.panel.panelFlow[panelConfigCriterionTypeFlowLevel +1]]
  },

  /**
   * Renvoit la PanelConfig precedente dans l'historique.
   * @return {PanelConfig} La PanelConfig precedente.
   */
  getLastPanelConfig: state => state.panelHistory[state.panelHistory.length - 1],

  /**
   * Verifie si l'historique est vide.
   * @return {Boolean}
   */
  isHistoryEmpty: state => state.panelHistory.length == 0,
}
