/**
 * @file Definit la classe de Configuration du Panel.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

 /**
  * Classe de Configuration du Panel.
  * @property {CriteriaSet} criteriaSet - L'ensemble de criteres actif dans le Panel.
  * @property {String} criteriaType - Le type de critere a afficher.
  */
class PanelConfig {

  /**
 * Cree une configuration.
 * @param {CriteriaSet} criteriaSet - L'ensemble de criteres actif dans le Panel.
 * @param {String} criterionType - Le type de critere a afficher.
  * @param {String} title - Le titre du Panel.
 */
<<<<<<< HEAD
  constructor (criteriaSet, criterionType, title, activeSortCriterionType) {
=======
  constructor (criteriaSet, criterionType, title) {
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
    this.criteriaSet  = criteriaSet
    this.criterionType = criterionType

    if (typeof title === undefined) {
      this.title = this.criteriaSet.criterion[this.criterionType].value
    } else {
      this.title = title
    }
<<<<<<< HEAD

    if (typeof activeSortCriterionType === undefined) {
      this.activeSortCriterionType = 'trackNumber'
    } else {
      this.activeSortCriterionType = activeSortCriterionType
    }
=======
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
  }
}

export default PanelConfig
