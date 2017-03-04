/**
 * @file Definit la classe DecisiveCriteriaSetStore.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Classe DecisiveCriteriaSet.
 * @type {DecisiveCriteriaSet}
 */
const DecisiveCriteriaSet = require('../../Criterion/CriteriaSet/DecisiveCriteriaSet')
/**
 * Classe Store.
 * @type {Store}
 */
const Store               = require('../')

/**
 * Stockeur d'ensembles de criteres determinants.
 * @property {Array} store - Les ensembles de criteres determinants stockes.
 */
class DecisiveCriteriaSetStore {
    /**
     * Cree un stockeur d'ensembles de criteres determinants.
     */
    constructor() {
        this.store = []
    }
    
    /**
     * Ajoute un ensemble de criteres determinant au stockeur.
     * @param {DecisiveCriteriaSet} DCS - Un ensemble de criteres determinant.
     * @return {number} L'indice de l'ensemble de criteres determinant enregistre.
     */
    add(DCS) {
        if (!(DCS instanceof DecisiveCriteriaSet)) {
            throw 'Invalid parameter'
        }
        
        return this.store.push(DCS) - 1
    }
}

module.exports = DecisiveCriteriaSetStore
