/**
 * @file Definit la classe de Configuration du Panel.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

/**
 * Classe de Configuration du Panel.
 * @property {CriteriaSet} criteriaSet - L'ensemble de criteres actif dans le Panel.
 * @property {String} criteriaType - Le type de critere a afficher.
 * @property {String} title - Le titre du panel.
 * @property {String} activeSortCriterionType - Le type de critere de tri du panel.
 */
class PanelConfig {
  /**
   * Cree une configuration.
   * @param {CriteriaSet} criteriaSet - L'ensemble de criteres actif dans le Panel.
   * @param {String} criterionType - Le type de critere a afficher.
   * @param {String} title - Le titre du Panel (facultatif).
   * @param {String} activeSortCriterionType - Le type de critere de tri du panel (facultatif).
   */
  constructor (criteriaSet, criterionType, title, activeSortCriterionType) {
    this.criteriaSet = criteriaSet
    this.criterionType = criterionType

    // Verifie si le titre du panel a ete definit, sinon definit sa valeur en fonction de l'ensemble de criteres.
    if (typeof title === 'undefined') {
      this.title = this.criteriaSet.criterion[this.criterionType].value
    } else {
      this.title = title
    }

    // Verifie si le titre du panel a ete definit, sinon definit sa valeur en fonction de l'ensemble de criteres.
    if (typeof activeSortCriterionType === 'undefined') {
      this.activeSortCriterionType = 'trackNumber'
    } else {
      this.activeSortCriterionType = activeSortCriterionType
    }
  }
}

export default PanelConfig
