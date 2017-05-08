/**
 * @file Definit la classe DecisiveCriteriaSetStore.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import electron from 'electron'

/**
 * Classe DecisiveCriteriaSet.
 * @type {DecisiveCriteriaSet}
 */
import DecisiveCriteriaSet from '../../Criterion/CriteriaSet/DecisiveCriteriaSet'

/**
 * Stockeur d'ensembles de criteres determinants.
 * @property {Array} store - Les ensembles de criteres determinants stockes.
 */
class DecisiveCriteriaSetStore {
  /**
   * Cree un stockeur d'ensembles de criteres determinants.
   */
  constructor () {
    this.store = []
  }

  /**
   * Ajoute un ensemble de criteres determinant au stockeur.
   * @param {DecisiveCriteriaSet} decisiveCriteriaSet - Un ensemble de criteres determinant.
   * @return {Number} L'indice de l'ensemble de criteres determinant enregistre.
   * @throws {TypeError} Lance une exception si l'ensemble de criteres determinant n'est pas reconnu.
   */
  add (decisiveCriteriaSet) {
    if (!(decisiveCriteriaSet instanceof DecisiveCriteriaSet)) {
      throw new TypeError('Unrecognized decisiveCriteriaSet')
    }

    // Previent toutes les fenetres que le Store a ete mis a jour.
    electron.webContents.getAllWebContents().forEach(contents => {
      contents.send('EVENT:DCSStore.updated')
    })

    return this.store.push(decisiveCriteriaSet) - 1
  }
}

export default DecisiveCriteriaSetStore
