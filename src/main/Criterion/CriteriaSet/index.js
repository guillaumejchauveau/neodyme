/**
 * @file Definit la classe CriteriaSet.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Conteneur d'injection de dependances.
 * @type {Object}
 */
import DIC from '../../DependencyInjectionContainer'
/**
 * Classe Criterion.
 * @type {Criterion}
 */
import Criterion from '../'

/**
 * Classe qui represente un ensemble de critere.
 * @property {Object} criteria - La liste des criteres.
 */
class CriteriaSet {
  /**
   * Cree un ensemble de critere.
   */
  constructor () {
    this.criteria = {}
  }

  /**
   * Ajoute un critere.
   * @param {Criterion} criterion - Le critere.
   * @throws Lance une exception si le critere n'est pas reconnu.
   */
  add (criterion) {
    if (!(criterion instanceof Criterion)) {
      throw new Error('Unrecognized criterion')
    }

    this.criteria[criterion.type] = criterion
  }

  /**
   * Supprime un critere.
   * @param {String} criterionType - Le type de critere.
   */
  remove (criterionType) {
    delete this.criteria[criterionType]
  }

  /**
   * Recupere tout les ensembles de criteres determinants correspondants.
   * @returns {Array} La liste des ensembles de criteres determinants correspondants.
   */
  resolveDecisiveCriteriaSets () {
    const DCSStore = DIC.get('DCSStore')

    let DCSs = DCSStore.store

    for (const criterionType in this.criteria) {
      const criterion = this.criteria[criterionType]
      const selectedDCSs = []

      DCSs.forEach(dcs => {
        if (dcs.criteria[criterion.type].value === criterion.value) {
          selectedDCSs.push(dcs)
        }
      })
      DCSs = selectedDCSs
    }

    return DCSs
  }

  /**
   * Recupere pour un type de critere les ensembles de criteres avec chaques valeurs possibles a partir de l'ensemble
   * courant.
   * @param {String} criterionType - Le type de critere.
   * @returns {Array} La liste d'ensembles de criteres possibles.
   * @throws Lance une exception si le type de critere n'est pas pris en charge.
   */
  resolveCriteriaByType (criterionType) {
    if (!Criterion.checkType(criterionType)) {
      throw new Error(`Unrecognized criterion type: ${criterionType}`)
    }

    const DCSs = this.resolveDecisiveCriteriaSets()
    const criterionValues = []
    const criteriaSets = []

    DCSs.forEach(dcs => {
      const criterion = dcs.criteria[criterionType]

      if (criterionValues.indexOf(criterion.value) === -1) { // Verifie si la valeur du critere n'a pas encore ete rencontree.
        criterionValues.push(criterion.value)

        const criteriaSet = new CriteriaSet()
        criteriaSet.add(criterion)

        // Copie les criteres de l'ensemble de criteres en cours.
        for (const criterionType in this.criteria) {
          criteriaSet.add(this.criteria[criterionType])
        }

        criteriaSets.push(criteriaSet)
      }
    })

    return criteriaSets
  }

  /**
   * Convertit une empreinte d'ensemble de criteres en ensemble de criteres.
   * @param criteriaSetFootprint
   * @returns {CriteriaSet}
   */
  static convertCriteriaSetFootprint (criteriaSetFootprint) {
    const criteriaSet = new CriteriaSet()

    for (const criterionType in criteriaSetFootprint.criteria) {
      const criterion = criteriaSetFootprint.criteria[criterionType]
      criteriaSet.add(new Criterion(criterion.type, criterion.value))
    }

    return criteriaSet
  }
}

export default CriteriaSet
