/**
 * @file Definit la classe DecisiveCriteriaSetStore.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import {webContents} from 'electron'

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
        
        // Previent toutes les fenetres que le Store a ete mis a jour.
        webContents.getAllWebContents().forEach(contents => {
            contents.send('EVENT:DCSStore.updated')
        })
        return this.store.push(DCS) - 1
    }
}

export default DecisiveCriteriaSetStore
