/**
 * @file Module Liste de lecture du Store.
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
    namespaced: true,
    state     : {
        tracks           : [],
        currentTrackIndex: -1
    },
    getters   : {
        /**
         * Permet d'obtenir le nombre de pistes.
         * @returns {Number}
         */
        tracksCount(state) {
            return state.tracks.length
        },
        currentTrack(state) {
            return (state.currentTrackIndex === -1) ? false : state.tracks[state.currentTrackIndex]
        }
    },
    mutations : {
        /**
         * Ajoute une piste a la liste de lecture.
         * @param {(Track|{data: Track, index: Number})} payload - La piste a ajouter.
         */
        ADD_TRACK(state, payload) {
            let track = payload
            let index = -1
            
            if (payload.data) {
                track = payload.data
                index = payload.index
            }
            
            state.tracks.splice(index, 0, track) // Ajoute la piste a l'index sans retirer d'elements.
        },
        /**
         * Enleve une piste a la liste de lecture.
         * @param {Number} index - L'index de la piste.
         */
        REMOVE_TRACK(state, index) {
            delete state.tracks[index]
        },
        /**
         * Enleve toutes les pistes.
         */
        CLEAR_TRACKS(state) {
            state.tracks = []
        },
        /**
         * Change la piste courante.
         * @param {Number} index
         */
        SET_CURRENT_TRACK(state, index) {
            if (index < -1 || index >= state.tracks.length) {
                index = -1
            }
            
            state.currentTrackIndex = index
        }
    },
    actions   : {
        /**
         * Ajoute des pistes a partir d'ensembles de criteres.
         * @param {(CriteriaSet|Array<CriteriaSet>|{data: (CriteriaSet|Array<CriteriaSet>), index: Number})} payload
         */
        addCriteriaSets(context, payload) {
            let criteriaSets = payload
            let index        = -1
            
            if (payload.data) {
                criteriaSets = payload.data
                index        = payload.index
            }
            
            if (!(criteriaSets instanceof Array)) {
                criteriaSets = [criteriaSets]
            }
            
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
            let dcs   = payload
            let index = -1
            
            if (payload.data) {
                dcs   = payload.data
                index = payload.index
            }
            
            context.commit('ADD_TRACK', {data: new Track(dcs), index})
        }
    }
}
