const CriteriaSet = require('../')

class DecisiveCriteriaSet extends CriteriaSet {
    constructor(config) {
        super()
        
        this.provider = config.provider
        this.id       = config.id
    }
}

module.exports = DecisiveCriteriaSet
