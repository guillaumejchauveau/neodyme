const DIC = require('../DIC')

class Criterion {
    constructor(type, value) {
        if (DIC.get('ConfigurationStore')
               .store
               .criterion
               .types
               .indexOf(type) == -1) {
            throw 'Unrecognized criterion type: ' + type
        }
        
        this.type  = type
        this.value = value
    }
}

module.exports = Criterion
