/**
 * @file Definit la classe de Configuration du Panel.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

/**
 * Classe CriteriaSet.
 * @type {CriteriaSet}
 */
import CriteriaSet from '../Criterion/CriteriaSet'

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
    if (!(criteriaSet instanceof CriteriaSet)) {
      throw new TypeError('Unrecognized criteriaSet')
    }

    if (typeof criterionType !== 'string') {
      throw new TypeError('Unrecognized criterionType')
    }

    // Verifie si le titre du panel a ete definit, sinon definit sa valeur en fonction de l'ensemble de criteres.
    if (typeof title !== 'string') {
      this.title = this.criteriaSet.criterion[this.criterionType].value
    } else {
      this.title = title
    }

    // Verifie si le type de critere de tri actif du panel a ete definit, sinon definit sa valeur par default.
    if (typeof activeSortCriterionType !== 'string') {
      this.activeSortCriterionType = 'trackNumber'
    } else {
      this.activeSortCriterionType = activeSortCriterionType
    }

    this.criteriaSet = criteriaSet
    this.criterionType = criterionType
  }

  /**
   * Determine si une autre configuration est egale a celle ci.
   * @param {PanelConfig} panelConfig - L'autre configuration de panel.
   * @return {Boolean}
   */
  isEqual (panelConfig) {
    if (!(panelConfig instanceof this.constructor)) {
      return false
    }

    // Verifie si le type de critere est le meme.
    if (this.criterionType === panelConfig.criterionType) {
      // Parcours les criteres.
      for (const criterionType in this.criteriaSet.criteria) {
        // Verifie que le type de critere est bien une propriete de l'ensemble de criteres.
        if (this.criteriaSet.criteria.hasOwnProperty(criterionType)) {
          // Recupere les deux valeurs des criteres A et B.
          const criterionA = this.criteriaSet.criteria[criterionType].value
          const criterionB = panelConfig.criteriaSet.criteria[criterionType].value
          // Compare les valeurs des deux criteres.
          if (criterionA !== criterionB) {
            return false
          }
        }
      }
      return true
    }
    return false
  }
}

export default PanelConfig
