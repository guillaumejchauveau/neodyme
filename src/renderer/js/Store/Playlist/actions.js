/**
 * @file Actions du module Liste de lecture du Store.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Actions de lecture du module Liste de lecture.
 */
import playbackActions from './playbackActions'

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
import Track from '../../Track'

export default {
  /**
   * Ajoute des pistes a partir d'ensembles de criteres.
   * @param {(CriteriaSet|Array<CriteriaSet>|{data: (CriteriaSet|Array<CriteriaSet>), index: Number})} payload
   * @returns {Promise}
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
    return new Promise((resolve, reject) => {
      let resolveCount = 0
      const resolver = () => {
        resolveCount++

        if (resolveCount === criteriaSets.length) {
          resolve()
        }
      }

      criteriaSets.forEach(criteriaSet => {
        if (criteriaSet instanceof DecisiveCriteriaSet) {
          try {
            context.dispatch('addDecisiveCriteriaSet', {data: criteriaSet, index})
            resolver()
          } catch (exception) {
            reject(new Error(exception.message))
          }
        } else {
          context.dispatch('addCriteriaSet', {data: criteriaSet, index})
                 .then(resolver)
                 .catch(reject)
        }
      })
    })
  },
  /**
   * Ajoute des pistes a partir d'un ensemble de criteres.
   * @param {(CriteriaSet|{data: CriteriaSet, index: Number})} payload
   * @returns {Promise}
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

    return new Promise((resolve, reject) => {
      criteriaSet.resolveDecisiveCriteriaSetFootprints()
                 .then(decisiveCriteriaSetFootprints => {
                   decisiveCriteriaSetFootprints.forEach(decisiveCriteriaSetFootprint => {
                     // Convertit l'empreinte en ensemble de criteres determinant.
                     const decisiveCriteriaSet = new DecisiveCriteriaSet({
                       providerKey: decisiveCriteriaSetFootprint.provider.config.key,
                       id: decisiveCriteriaSetFootprint.id
                     })
                     // Copie les criteres.
                     for (const criterionType in decisiveCriteriaSetFootprint.criteria) {
                       if (decisiveCriteriaSetFootprint.criteria.hasOwnProperty(criterionType)) {
                         const criterion = decisiveCriteriaSetFootprint.criteria[criterionType]
                         decisiveCriteriaSet.add(new Criterion(criterion.type, criterion.value))
                       }
                     }

                     context.dispatch('addDecisiveCriteriaSet', {data: decisiveCriteriaSet, index})
                   })

                   resolve()
                 })
                 .catch(reject)
    })
  },
  /**
   * Ajoute une piste a partir d'un ensemble de criteres determinant.
   * @param {(DecisiveCriteriaSet|{data: DecisiveCriteriaSet, index: Number})} payload
   */
  addDecisiveCriteriaSet (context, payload) {
    // Reformatage des donnees a traiter.
    let decisiveCriteriaSet = payload
    let index = null
    if (payload.data) {
      decisiveCriteriaSet = payload.data
      index = payload.index
    }

    // Traitement.
    context.dispatch('add', {data: new Track(decisiveCriteriaSet), index})
  },
  /**
   * Ajoute une piste a la liste de lecture.
   * @param {(Track|{data: Track, index: Number})} payload
   */
  add (context, payload) {
    // Reformatage des donnees a traiter.
    let track = payload
    let index = null
    if (payload.data) {
      track = payload.data
      index = payload.index
    }

    if (index < 0) {
      index = context.state.tracks.length + index
    }

    // Traitement.
    context.commit('ADD_TRACK', {data: track, index})

    if (index <= context.state.currentTrackIndex) {
      context.commit('SET_CURRENT_TRACK', context.state.currentTrackIndex + 1)
    }
  },
  /**
   * Enleve une piste a la liste de lecture.
   * @param {Number} requestedIndex - L'index de la piste.
   * @returns {Promise}
   */
  remove (context, requestedIndex) {
    // Reformatage des donnees a traiter.
    let index = requestedIndex
    if (index < 0) {
      index = context.state.tracks.length + index
    }

    // Traitement.
    return new Promise((resolve, reject) => {
      if (context.getters['player/playerIs']('LOADING')) {
        return reject(new Error('Player is loading'))
      }

      if (index === context.state.currentTrackIndex) {
        context.dispatch('stop')
               .then(() => {
                 context.commit('REMOVE_TRACK', index)
                 resolve()
               })
               .catch(reject)
      } else {
        context.commit('REMOVE_TRACK', index)

        if (index < context.state.currentTrackIndex) {
          context.commit('SET_CURRENT_TRACK', context.state.currentTrackIndex - 1)
        }
        resolve()
      }
    })
  },
  /**
   * Efface la liste de lecture.
   * @returns {Promise}
   */
  clear (context) {
    return new Promise((resolve, reject) => {
      if (context.getters['player/playerIs']('LOADING')) {
        return reject(new Error('Player is loading'))
      }

      context.dispatch('stop')
             .then(() => {
               context.commit('CLEAR_TRACKS')
               resolve()
             })
             .catch(reject)
    })
  },
  ...playbackActions
}
