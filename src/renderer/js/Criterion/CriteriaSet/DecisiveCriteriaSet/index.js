/**
 * @file Definit la classe DecisiveCriteriaSet.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import { ipcRenderer } from 'electron'
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
   * @param {Object} decisiveCriteriaSetConfig - Les informations de determination.
   * @throws {TypeError} Lance une exception si la configuration n'est pas valide.
   * @throws {TypeError} Lance une exception si l'identifiant de la source n'est pas valide.
   */
  constructor (decisiveCriteriaSetConfig) {
    super()

    if (typeof decisiveCriteriaSetConfig !== 'object' ||
      !decisiveCriteriaSetConfig.hasOwnProperty('providerKey') || !decisiveCriteriaSetConfig.hasOwnProperty('id')) {
      throw new TypeError('Invalid decisiveCriteriaSetConfig')
    }
    if (typeof decisiveCriteriaSetConfig.providerKey !== 'number') {
      throw new TypeError('Invalid providerKey')
    }

    this.providerKey = decisiveCriteriaSetConfig.providerKey
    this.id = decisiveCriteriaSetConfig.id
  }

  /**
   * Appelle la methode getDataBuffer() de la source correspondante à l'ensemble determinant courant (via IPC).
   * @returns {Promise} Une promise qui resout un {ArrayBuffer}.
   */
  getDataBuffer () {
    return new Promise((resolve, reject) => {
      ipcRenderer.send('REQ:Provider.getDataBuffer', this.providerKey, this.id)

      ipcRenderer.once('RES:Provider.getDataBuffer', (event, base64ArrayBuffer) => {
        if (base64ArrayBuffer.error) {
          reject(new Error(base64ArrayBuffer.error))
          return
        }
        resolve(base64AB.decode(base64ArrayBuffer))
      })
    })
  }
}

export default DecisiveCriteriaSet
