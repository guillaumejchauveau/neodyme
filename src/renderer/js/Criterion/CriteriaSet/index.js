/**
 * @file Definit la classe CriteriaSet.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import {ipcRenderer} from 'electron'

/**
 * Classe Criterion.
 * @type {Criterion}
 */
import Criterion from '../'

/**
 * Classe qui represente un ensemble de critere.
 * @property {Object} criteria - La liste des criteres.
 */
class CriteriaSet {
    /**
     * Cree un ensemble de critere.
     */
    constructor() {
        this.criteria = {}
    }
    
    /**
     * Ajoute un critere.
     * @param {Criterion} criterion - Le critere.
     * @throws Lance une exception si le critere n'est pas reconnu.
     */
    add(criterion) {
        if (!(criterion instanceof Criterion)) {
            throw 'Unrecognized criterion'
        }
        
        this.criteria[criterion.type] = criterion
    }
    
    /**
     * Supprime un critere.
     * @param {String} criterionType - Le type de critere.
     */
    remove(criterionType) {
        delete this.criteria[criterionType]
    }
    
    /**
     * Recupere toutes les empreintes d'ensembles de criteres determinants correspondants (via IPC).
     * @returns {Promise} Une Promise qui resout un {Array}.
     */
    resolveDecisiveCriteriaSetFootprints() {
        return new Promise((resolve, reject) => {
            ipcRenderer.send('REQ:CriteriaSet.resolveDecisiveCriteriaSets', this)
            
            ipcRenderer.on('RES:CriteriaSet.resolveDecisiveCriteriaSets', (event, decisiveCriteriaSetFootprints) => {
                ipcRenderer.removeAllListeners('RES:CriteriaSet.resolveDecisiveCriteriaSets')
                resolve(decisiveCriteriaSetFootprints)
            })
        })
    }
    
    /**
     * Recupere toutes les valeurs possibles pour un type de critere a partir de l'ensemble de criteres en cours (via IPC).
     * @param {String} criterionType - Le type de critere.
     * @returns {Promise} Une Promise qui resout un {Array}.
     * @throws Lance une exception si le type de critere n'est pas pris en charge.
     */
    resolveCriteriaByType(criterionType) {
        if (!Criterion.checkType(criterionType)) {
            throw `Unrecognized criterion type: ${type}`
        }
        
        return new Promise((resolve, reject) => {
            ipcRenderer.send('REQ:CriteriaSet.resolveCriteriaByType', this, criterionType)
            
            ipcRenderer.on('RES:CriteriaSet.resolveCriteriaByType', (event, criteriaSetFootprints) => {
                ipcRenderer.removeAllListeners('RES:CriteriaSet.resolveCriteriaByType')
                const criteriaSets = []
                
                criteriaSetFootprints.forEach(criteriaSetFootprint => {
                    criteriaSets.push(CriteriaSet.convertCriteriaSetFootprint(criteriaSetFootprint))
                })
                
                resolve(criteriaSets)
            })
        })
    }
    
    /**
     * Convertit une empreinte d'ensemble de criteres en ensemble de criteres.
     * @param criteriaSetFootprint
     * @returns {CriteriaSet}
     */
    static convertCriteriaSetFootprint(criteriaSetFootprint) {
        const criteriaSet = new CriteriaSet()
    
        for (const criterionType in criteriaSetFootprint.criteria) {
            const criterion = criteriaSetFootprint.criteria[criterionType]
            criteriaSet.add(new Criterion(criterion.type, criterion.value))
        }
        
        return criteriaSet
    }
}

export default CriteriaSet
