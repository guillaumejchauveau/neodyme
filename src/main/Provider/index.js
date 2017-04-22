/**
 * @file Definit la classe Provider.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Classe abstraite qui represente une source.
 * @property {Object} config - La configuration de la source.
 */
class Provider {
    /**
     * Cree une source.
     * @param {Object} providerConfig - La configuration de la source.
     */
    constructor(providerConfig) {
        this.config = providerConfig
    }
    
    /**
     * Methode abstraite devant etre mise en oeuvre par les classes enfants.
     * @throws Lance une exception si la methode n'est pas mise en oeuvre.
     */
    makeTrackList() {
        throw 'Not implemented'
    }
    
    /**
     * Methode abstraite devant etre mise en oeuvre par les classes enfants.
     * @param {*} id - L'identifiant unique pour la source.
     * @throws Lance une exception si la methode n'est pas mise en oeuvre.
     */
    getDataBuffer(id) {
        throw 'Not implemented'
    }
}

export default Provider
