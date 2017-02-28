class Provider {
    constructor(providerConfig) {
        this.config = providerConfig
    }
    
    makeTrackList() {
        throw 'Not implemented'
    }
}

module.exports = Provider
