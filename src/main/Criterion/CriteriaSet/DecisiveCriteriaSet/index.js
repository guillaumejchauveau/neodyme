/**
 * @file Definit la classe DecisiveCriteriaSet.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Classe CriteriaSet.
 * @type {CriteriaSet}
 */
import CriteriaSet from '../'

/**
 * Classe qui represente un ensemble de criteres determinant.
 * @extends CriteriaSet
 * @property {Provider} provider - La source.
 * @property {*}        id       - L'identifiant unique pour la source.
 */
class DecisiveCriteriaSet extends CriteriaSet {
  /**
   * Cree un ensemble de criteres determiant.
   * @param {Object} config - Les informations de determination.
   */
  constructor (config) {
    super()

    this.provider = config.provider
    this.id = config.id
  }

  /**
   * Appelle la methode getDataBuffer() de la source pour l'ensemble determinant courant.
   * @returns {Promise} Une promise qui resout un {ArrayBuffer}.
   */
  getDataBuffer () {
    return this.provider.getDataBuffer(this.id)
  }
}

export default DecisiveCriteriaSet
