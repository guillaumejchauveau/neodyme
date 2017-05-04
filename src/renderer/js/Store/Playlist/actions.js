/**
 * @file Actions du module Liste de lecture du Store.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Classe Criterion.
 * @type {Criterion}
 */
import Criterion from '../../Criterion'
/**
 * Classe CriteriaSet.
 * @type {CriteriaSet}
 */
import CriteriaSet from '../../Criterion/CriteriaSet'
/**
 * Classe DecisiveCriteriaSet.
 * @type {DecisiveCriteriaSet}
 */
import DecisiveCriteriaSet from '../../Criterion/CriteriaSet/DecisiveCriteriaSet'
/**
 * Classe Track.
 * @type {Track}
 */
import Track from '../../App/Playlist/Track'

export default {
  /**
   * Ajoute des pistes a partir d'ensembles de criteres.
   * @param {(CriteriaSet|Array<CriteriaSet>|{data: (CriteriaSet|Array<CriteriaSet>), index: Number})} payload
   */
  addCriteriaSets (context, payload) {
    // Reformatage des donnees a traiter.
    let criteriaSets = payload
    let index = null
    if (payload.data) {
      criteriaSets = payload.data
      index = payload.index
    }
    if (!(criteriaSets instanceof Array)) {
      criteriaSets = [criteriaSets]
    }

    // Traitement.
    criteriaSets.forEach(criteriaSet => {
      if (criteriaSet instanceof DecisiveCriteriaSet) {
        context.dispatch('addDecisiveCriteriaSet', {data: criteriaSet, index})
      } else {
        context.dispatch('addCriteriaSet', {data: criteriaSet, index})
      }
    })
  },
  /**
   *
   * @param {(CriteriaSet|{data: CriteriaSet, index: Number})} payload
   * @throws {TypeError} Lance un exception si l'ensemble de criteres n'est pas valide.
   * @throws {Error} Lance une exception si une erreur est rencontree.
   */
  addCriteriaSet (context, payload) {
    // Reformatage des donnees a traiter.
    let criteriaSet = payload
    let index = null
    if (payload.data) {
      criteriaSet = payload.data
      index = payload.index
    }

    // Traitement.
    if (!(criteriaSet instanceof CriteriaSet)) {
      throw TypeError('Invalid criteriaSet')
    }

    criteriaSet.resolveDecisiveCriteriaSetFootprints()
               .then(decisiveCriteriaSetFootprints => {
                 decisiveCriteriaSetFootprints.forEach(decisiveCriteriaSetFootprint => {
                   // Convertit l'empreinte en ensemble de criteres determinant.
                   const decisiveCriteriaSet = new DecisiveCriteriaSet({
                     providerKey: decisiveCriteriaSetFootprint.provider.config.key,
                     id: decisiveCriteriaSetFootprint.id
                   })
                   for (const criterionType in decisiveCriteriaSetFootprint.criteria) {
                     if (decisiveCriteriaSetFootprint.criteria.hasOwnProperty(criterionType)) {
                       const criterion = decisiveCriteriaSetFootprint.criteria[criterionType]
                       decisiveCriteriaSet.add(new Criterion(criterion.type, criterion.value))
                     }
                   }

                   context.dispatch('addDecisiveCriteriaSet', {data: decisiveCriteriaSet, index})
                 })
               })
               .catch(reason => {
                 throw new Error(reason)
               })
  },
  /**
   * Ajoute une piste a partir d'un ensemble de criteres determinant.
   * @param {(DecisiveCriteriaSet|{data: DecisiveCriteriaSet, index: Number})} payload
   */
  addDecisiveCriteriaSet (context, payload) {
    // Reformatage des donnees a traiter.
    let dcs = payload
    let index = null
    if (payload.data) {
      dcs = payload.data
      index = payload.index
    }

    // Traitement.
    context.commit('ADD_TRACK', {data: new Track(dcs), index})
  }
}
