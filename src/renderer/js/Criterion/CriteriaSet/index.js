/**
 * @file Definit la classe CriteriaSet.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import { ipcRenderer } from 'electron'

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
   * @throws {TypeError} Lance une exception si le critere n'est pas reconnu.
   */
  add (criterion) {
    if (!(criterion instanceof Criterion)) {
      throw TypeError('Unrecognized criterion')
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
   * Recupere toutes les empreintes d'ensembles de criteres determinants correspondants (via IPC).
   * @returns {Promise} Une Promise qui resout un {Array}.
   */
  resolveDecisiveCriteriaSetFootprints () {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('REQ:CriteriaSet.resolveDecisiveCriteriaSets', this)

      ipcRenderer.once('RES:CriteriaSet.resolveDecisiveCriteriaSets', (event, decisiveCriteriaSetFootprints) => {
        if (decisiveCriteriaSetFootprints.error) {
          reject(decisiveCriteriaSetFootprints.error)
          return
        }
        resolve(decisiveCriteriaSetFootprints)
      })
    })
  }

  /**
   * Recupere toutes les valeurs possibles pour un type de critere a partir de l'ensemble de criteres en cours (via
   * IPC).
   * @param {String} criterionType - Le type de critere.
   * @returns {Promise} Une Promise qui resout un {Array}.
   * @throws {TypeError} Lance une exception si le type de critere n'est pas pris en charge.
   */
  resolveCriteriaByType (criterionType) {
    if (!Criterion.checkType(criterionType)) {
      throw TypeError(`Unrecognized criterion type: ${criterionType}`)
    }

    return new Promise((resolve, reject) => {
      ipcRenderer.send('REQ:CriteriaSet.resolveCriteriaByType', this, criterionType)

      ipcRenderer.once('RES:CriteriaSet.resolveCriteriaByType', (event, criteriaSetFootprints) => {
        if (criteriaSetFootprints.error) {
          reject(criteriaSetFootprints.error)
          return
        }

        const criteriaSets = []

        criteriaSetFootprints.forEach(criteriaSetFootprint => {
          criteriaSets.push(CriteriaSet.convertCriteriaSetFootprint(criteriaSetFootprint))
        })

        resolve(criteriaSets)
      })
    })
  }

  /**
   * Convertit une empreinte d'ensemble de criteres en ensemble de criteres.
   * @param {Object} criteriaSetFootprint
   * @returns {CriteriaSet}
   * @throws {TypeError} Lance une exception si l'empreinte n'est pas valide.
   */
  static convertCriteriaSetFootprint (criteriaSetFootprint) {
    if (typeof criteriaSetFootprint !== 'object' || !criteriaSetFootprint.criteria) {
      throw new TypeError('Invalid criteriaSetFootprint')
    }

    const criteriaSet = new CriteriaSet()

    for (const criterionType in criteriaSetFootprint.criteria) {
      if (criteriaSetFootprint.criteria.hasOwnProperty(criterionType)) {
        const criterion = criteriaSetFootprint.criteria[criterionType]
        criteriaSet.add(new Criterion(criterion.type, criterion.value))
      }
    }

    return criteriaSet
  }
}

export default CriteriaSet
