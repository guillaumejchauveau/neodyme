class CriteriaSet {
    constructor() {
        this._criteria = {}
    }
    
    add(criterion) {
        this._criteria[criterion.type] = criterion
    }
    
    remove(criterionType) {
        delete this._criteria[criterionType]
    }
    
    resolveDecisiveCriteriaSets() {
        
    }
    
    resolveCriteriaByType(criterionType) {
        
    }
}

module.exports = CriteriaSet
