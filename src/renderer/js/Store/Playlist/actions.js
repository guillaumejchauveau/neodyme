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
import Track from '../../Playlist/Track'

export default {
    /**
     * Ajoute des pistes a partir d'ensembles de criteres.
     * @param {(CriteriaSet|Array<CriteriaSet>|{data: (CriteriaSet|Array<CriteriaSet>), index: Number})} payload
     */
    addCriteriaSets(context, payload) {
        // Reformatage des donnees a traiter.
        let criteriaSets = payload
        let index        = null
        if (payload.data) {
            criteriaSets = payload.data
            index        = payload.index
        }
        if (!(criteriaSets instanceof Array)) {
            criteriaSets = [criteriaSets]
        }
        
        // Traitement.
        criteriaSets.forEach(criteriaSet => {
            if (!(criteriaSet instanceof CriteriaSet)) {
                throw 'Invalid criteriaSet'
            }
            
            if (criteriaSet instanceof DecisiveCriteriaSet) {
                context.dispatch('addDecisiveCriteriaSet', {data: criteriaSet, index})
            } else {
                criteriaSet.resolveDecisiveCriteriaSetFootprints()
                           .then(decisiveCriteriaSetFootprints => {
                               decisiveCriteriaSetFootprints.forEach(decisiveCriteriaSetFootprint => {
                                   // Convertit l'empreinte en ensemble de criteres determinant.
                                   const decisiveCriteriaSet = new DecisiveCriteriaSet({
                                                                                           providerKey: decisiveCriteriaSetFootprint.provider.config.key,
                                                                                           id         : decisiveCriteriaSetFootprint.id
                                                                                       })
                                   for (const criterionType in decisiveCriteriaSetFootprint.criteria) {
                                       const criterion = decisiveCriteriaSetFootprint.criteria[criterionType]
                                       decisiveCriteriaSet.add(new Criterion(criterion.type, criterion.value))
                                   }
                        
                                   context.dispatch('addDecisiveCriteriaSet', {data: decisiveCriteriaSet, index})
                               })
                           })
            }
        })
    },
    /**
     * Ajoute une piste a partir d'un ensemble de criteres determinant.
     * @param {(DecisiveCriteriaSet|{data: DecisiveCriteriaSet, index: Number})} payload
     */
    addDecisiveCriteriaSet(context, payload) {
        // Reformatage des donnees a traiter.
        let dcs   = payload
        let index = null
        if (payload.data) {
            dcs   = payload.data
            index = payload.index
        }
        
        // Traitement.
        context.commit('ADD_TRACK', {data: new Track(dcs), index})
    }
}
