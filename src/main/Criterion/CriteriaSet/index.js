const DIC = require('../../DIC')

class CriteriaSet {
    constructor() {
        this.criteria = {}
    }
    
    add(criterion) {
        this.criteria[criterion.type] = criterion
    }
    
    remove(criterionType) {
        delete this.criteria[criterionType]
    }
    
    /*
     * Recupere tout les ensembles de criteres determinants correspondants
     */
    resolveDecisiveCriteriaSets() {
        const DCSStore = DIC.get('DCSStore')
        
        let DCSs = DCSStore.store
        
        for (const criterionType in this.criteria) {
            const criterion    = this.criteria[criterionType]
            const selectedDCSs = []
            
            DCSs.forEach(dcs => {
                if (dcs.criteria[criterion.type].value == criterion.value) {
                    selectedDCSs.push(dcs)
                }
            })
            DCSs = selectedDCSs
        }
        
        return DCSs
    }
    
    /*
     * Recupere toutes les valeurs possibles pour un type de critere a partir de l'ensemble de criteres en cours
     */
    resolveCriteriaByType(criterionType) {
        const DCSs            = this.resolveDecisiveCriteriaSets()
        const criterionValues = []
        const criteriaSets    = []
        
        DCSs.forEach(dcs => {
            const criterion = dcs.criteria[criterionType]
            
            if (criterionValues.indexOf(criterion.value) == -1) { // Verifie si la valeur du critere n'a pas encore ete rencontree
                criterionValues.push(criterion.value)
                
                const criteriaSet = new CriteriaSet()
                criteriaSet.add(criterion)
                
                // Copie les criteres de l'ensemble de criteres en cours
                for (const criterionType in this.criteria) {
                    criteriaSet.add(this.criteria[criterionType])
                }
                
                criteriaSets.push(criteriaSet)
            }
        })
        
        return criteriaSets
    }
}

module.exports = CriteriaSet
