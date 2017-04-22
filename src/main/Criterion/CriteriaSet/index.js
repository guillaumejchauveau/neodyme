/**
 * @file Definit la classe CriteriaSet.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Conteneur d'injection de dependances.
 * @type {Object}
 */
import DIC from '../../DIC'
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
     * Recupere tout les ensembles de criteres determinants correspondants.
     * @returns {Array} La liste des ensembles de criteres determinants correspondants.
     */
    resolveDecisiveCriteriaSets() {
        const DCSStore = DIC['DCSStore']
        
        let decisiveCriteriaSets = DCSStore.store
        
        for (const criterionType in this.criteria) {
            const criterion                    = this.criteria[criterionType]
            const selectedDecisiveCriteriaSets = []

            decisiveCriteriaSets.forEach(decisiveCriteriaSet => {
                if (decisiveCriteriaSet.criteria[criterion.type].value === criterion.value) {
                    selectedDecisiveCriteriaSets.push(decisiveCriteriaSet)
                }
            })
            decisiveCriteriaSets = selectedDecisiveCriteriaSets
        }
        
        return decisiveCriteriaSets
    }
    
    /**
     * Recupere pour un type de critere les ensembles de criteres avec chaques valeurs possibles a partir de l'ensemble courant.
     * @param {String} criterionType - Le type de critere.
     * @returns {Array} La liste d'ensembles de criteres possibles.
     * @throws Lance une exception si le type de critere n'est pas pris en charge.
     */
    resolveCriteriaByType(criterionType) {
        if (!Criterion.checkType(criterionType)) {
            throw `Unrecognized criterion type: ${type}`
        }
        
        const decisiveCriteriaSets = this.resolveDecisiveCriteriaSets()
        const criterionValues      = []
        const criteriaSets         = []
        
        decisiveCriteriaSets.forEach(decisiveCriteriaSet => {
            const criterion = decisiveCriteriaSet.criteria[criterionType]
            
            if (criterionValues.indexOf(criterion.value) === -1) { // Verifie si la valeur du critere n'a pas encore ete rencontree.
                criterionValues.push(criterion.value)
                
                const criteriaSet = new CriteriaSet()
                criteriaSet.add(criterion)
                
                // Copie les criteres de l'ensemble de criteres en cours.
                for (const criterionType in this.criteria) {
                    criteriaSet.add(this.criteria[criterionType])
                }
                
                criteriaSets.push(criteriaSet)
            }
        })
        
        return criteriaSets
    }
    
    /**
     * Convertit une empreinte d'ensemble de criteres en ensemble de criteres.
     * @param {Object} criteriaSetFootprint
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
