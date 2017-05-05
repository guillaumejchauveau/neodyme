/**
 * @file Definit la classe Provider.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Conteneur d'injection de dependances.
 * @type {Object}
 */
import DIC from '../DependencyInjectionContainer'
/**
 * Classe Criterion.
 * @type {Criterion}
 */
import Criterion from '../Criterion'
/**
 * Classe DecisiveCriteriaSet.
 * @type {DecisiveCriteriaSet}
 */
import DecisiveCriteriaSet from '../Criterion/CriteriaSet/DecisiveCriteriaSet'

/**
 * Classe abstraite qui represente une source.
 * @property {Object} config - La configuration de la source.
 */
class Provider {
  /**
   * Cree une source.
   * @param {Object} providerConfig - La configuration de la source.
   * @throws {TypeError} Lance une exception si la configuration n'est pas valide.
   * @throws {Error} Lance une exception si le nombre de mappeurs de la source n'est pas valide.
   */
  constructor (providerConfig) {
    // Validation de la configuration.
    if (typeof providerConfig !== 'object') {
      throw new TypeError('Invalid providerConfig')
    }
    if (!providerConfig.hasOwnProperty('key') || typeof providerConfig.key !== 'number') {
      throw new TypeError('Invalid provider key')
    }
    if (!providerConfig.typeMappers || !(providerConfig.typeMappers instanceof Array)) {
      throw new TypeError('Invalid provider typeMappers')
    }
    if (providerConfig.typeMappers.length !== DIC.get('ConfigurationStore').get('criterion').types.length) {
      throw new Error('Invalid provider typeMappers number')
    }

    this.config = providerConfig
  }

  /**
   * Enregistre une piste.
   * @param provider {Provider} - La source.
   * @param id {*}              - L'identifiant unique pour la source.
   * @param metadatas {*}       - Metadonnees de la piste.
   */
  static saveTrack (provider, id, metadatas) {
    const decisiveCriteriaSet = new DecisiveCriteriaSet({
      provider,
      id
    })

    // Ajoute chaques criteres a partir des metadonnees.
    DIC.get('ConfigurationStore').get('criterion').types.forEach((criterionType, index) => {
      decisiveCriteriaSet.add(new Criterion(criterionType, provider.config.typeMappers[index](metadatas)))
    })

    // Enregistre la nouvelle piste.
    DIC.get('DCSStore').add(decisiveCriteriaSet)
  }

  /**
   * Methode abstraite devant etre mise en oeuvre par les classes enfants.
   * @throws {Error} Lance une exception si la methode n'est pas mise en oeuvre.
   */
  makeTracksList () {
    throw new Error('Not implemented')
  }

  /**
   * Methode abstraite devant etre mise en oeuvre par les classes enfants.
   * @param {*} id - L'identifiant unique pour la source.
   * @throws {Error} Lance une exception si la methode n'est pas mise en oeuvre.
   */
  getDataBuffer () {
    throw new Error('Not implemented')
  }
}

export default Provider
