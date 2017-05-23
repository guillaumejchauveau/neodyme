/**
 * @file Definit la classe DecisiveCriteriaSet.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Conteneur d'injection de dependances.
 * @type {Object}
 */
import DIC from '../../../DependencyInjectionContainer'
/**
 * Classe CriteriaSet.
 * @type {CriteriaSet}
 */
import CriteriaSet from '../'
/**
 * Classe Provider.
 * @type {Provider}
 */
import Provider from '../../../Provider'

/**
 * Classe qui represente un ensemble de criteres determinant.
 * @extends CriteriaSet
 * @property {Provider} provider - La source.
 * @property {*}        id       - L'identifiant unique pour la source.
 */
class DecisiveCriteriaSet extends CriteriaSet {
  /**
   * Cree un ensemble de criteres determiant.
   * @param {Object} decisiveCriteriaSetConfig - Les informations de determination.
   * @throws {TypeError} Lance une exception si la configuration n'est pas valide.
   * @throws {TypeError|ReferenceError} Lance une exception si la source n'est pas reconnue ou n'est pas valide.
   */
  constructor (decisiveCriteriaSetConfig) {
    super()

    // Validation des informations de determination.
    if (typeof decisiveCriteriaSetConfig !== 'object' ||
      !decisiveCriteriaSetConfig.hasOwnProperty('provider') || !decisiveCriteriaSetConfig.hasOwnProperty('id')) {
      throw new TypeError('Invalid decisiveCriteriaSetConfig')
    }
    if (!(decisiveCriteriaSetConfig.provider instanceof Provider)) {
      throw new TypeError('Unrecognized provider')
    }
    const configurationStore = DIC.get('ConfigurationStore')
    const referenceProvider = configurationStore.get('providers')[decisiveCriteriaSetConfig.provider.config.key]
    // Validation de la source.
    if (!referenceProvider || decisiveCriteriaSetConfig.provider !== referenceProvider) {
      throw new ReferenceError('Unknown provider')
    }

    this.provider = decisiveCriteriaSetConfig.provider
    this.id = decisiveCriteriaSetConfig.id
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
