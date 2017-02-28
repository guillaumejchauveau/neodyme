const DIC    = require('../DIC')
const config = DIC.get('ConfigurationStore')

class Criterion {
    constructor(type, value) {
        if (config.criterion.types.indexOf(type) == -1) {
            throw 'Unrecognized criterion type: ' + type
        }
        
        this.type  = type
        this.value = value
    }
}

module.exports = Criterion
