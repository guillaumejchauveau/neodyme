/**
 * @file Definit la classe DecisiveCriteriaSet.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import {ipcRenderer} from 'electron'
import base64AB from 'base64-arraybuffer'

/**
 * Classe CriteriaSet.
 * @type {CriteriaSet}
 */
import CriteriaSet from '../'

/**
 * Classe qui represente un ensemble de criteres determinant.
 * @extends CriteriaSet
 * @property {Provider} providerKey - L'identifiant de la source.
 * @property {*}        id          - L'identifiant unique pour la source.
 */
class DecisiveCriteriaSet extends CriteriaSet {
    /**
     * Cree un ensemble de criteres determiant.
     * @param {Object} config - Les informations de determination.
     */
    constructor(config) {
        super()
        
        this.providerKey = config.providerKey
        this.id          = config.id
    }
    
    /**
     * Appelle la methode getDataBuffer() de la source correspondante à l'ensemble determinant courant (via IPC).
     * @returns {Promise} Une promise qui resout un {ArrayBuffer}.
     */
    getDataBuffer() {
        return new Promise((resolve, reject) => {
            ipcRenderer.send('Provider.getDataBuffer', this.providerKey, this.id)
            
            ipcRenderer.on('Provider.getDataBuffer', (event, base64ArrayBuffer) => {
                resolve(base64AB.decode(base64ArrayBuffer))
            })
        })
    }
}

export default DecisiveCriteriaSet
