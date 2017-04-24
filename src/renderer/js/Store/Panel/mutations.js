/**
 * @file Mutations du module Panel du Store.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

/**
* Classe PanelConfig.
* @type {PanelConfig}
*/
import PanelConfig from '../../Panel/PanelConfig'

export default {

  /**
   * Set un PanelConfig.
   * @param {PanelConfig} panelConfig - Le PanelConfig.
   */
  SET_PANELCONFIG (state, panelConfig) {
    state.currentPanelConfig = panelConfig
  },

  /**
   * Set les elements du panel.
   * @param {Array} elements - Les elements.
   */
  SET_CURRENTPANELELEMENTS (state, elements) {
    state.currentPanelElements = elements
  },

  /**
   * Ajoute une PanelConfig a l'historique.
   * @param {PanelConfig} panelConfig - La PanelConfig a ajouter.
   */
  ADD_PANELHISTORY_ENTRY (state, panelConfig) {
    state.panelHistory.push(panelConfig)
  },

  /**
   * Retire la derniere entree de l'historique.
   */
  REMOVE_LAST_PANELHISTORY_ENTRY (state) {
    state.panelHistory.pop()
  },

  /**
   * Vide l'historique.
   */
  CLEAR_PANELHISTORY (state) {
    state.PanelHistory = []
  }
}
