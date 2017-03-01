const DecisiveCriteriaSet = require('../../Criterion/CriteriaSet/DecisiveCriteriaSet')

class DecisiveCriteriaSetStore {
    constructor() {
        this.store = []
    }
    
    add(DCS) {
        if (!(DCS instanceof DecisiveCriteriaSet)) {
            throw 'TypeError'
        }
        
        return this.store.push(DCS) - 1
    }
}

module.exports = DecisiveCriteriaSetStore
