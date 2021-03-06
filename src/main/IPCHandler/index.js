/**
 * @file Gestionnaire de requetes IPC.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import { ipcMain } from 'electron'
import base64AB from 'base64-arraybuffer'

/**
 * Conteneur d'injection de dependances.
 * @type {Object}
 */
import DIC from '../DependencyInjectionContainer'
/**
 * Classe CriteriaSet.
 * @type {CriteriaSet}
 */
import CriteriaSet from '../Criterion/CriteriaSet'

const IPCHandler = {
  handlers: {
    CriteriaSet: {
      /**
       * Repond a une requete de resolution d'ensembles de criteres determinants.
       * @param {Object} event                - L'evenement IPC.
       * @param {Object} criteriaSetFootprint - L'empreinte d'ensemble de criteres.
       */
      resolveDecisiveCriteriaSets (event, criteriaSetFootprint) {
        let response
        try {
          const criteriaSet = CriteriaSet.convertCriteriaSetFootprint(criteriaSetFootprint)
          response = criteriaSet.resolveDecisiveCriteriaSets()
        } catch (exception) {
          response = {error: exception.message}
        } finally {
          event.sender.send('RES:CriteriaSet.resolveDecisiveCriteriaSets', response)
        }
      },
      /**
       * Repond a une requete de resolution d'ensembles de criteres possibles selon le type de critere.
       * @param {Object} event                - L'evenement IPC.
       * @param {Object} criteriaSetFootprint - L'empreinte d'ensemble de criteres.
       * @param {String} type                 - Le type de critere.
       */
      resolveCriteriaByType (event, criteriaSetFootprint, type) {
        let response
        try {
          const criteriaSet = CriteriaSet.convertCriteriaSetFootprint(criteriaSetFootprint)
          response = criteriaSet.resolveCriteriaByType(type)
        } catch (exception) {
          response = {error: exception.message}
        } finally {
          event.sender.send('RES:CriteriaSet.resolveCriteriaByType', response)
        }
      }
    },
    Provider: {
      /**
       * Repond a une requete de donnees brutes d'une piste.
       * @param {Object} event       - L'evenement IPC.
       * @param {Number} providerKey - La cle de la source.
       * @param {String} id          - L'identifiant unique pour la source.
       */
      getDataBuffer (event, providerKey, id) {
        try {
          DIC.get('ConfigurationStore')
             .get('providers')[providerKey].getDataBuffer(id)
                                           .then(data => {
                                             event.sender.send('RES:Provider.getDataBuffer', base64AB.encode(data))
                                           })
                                           .catch(reason => {
                                             event.sender.send('RES:Provider.getDataBuffer', {error: reason.message})
                                           })
        } catch (exception) {
          event.sender.send('RES:Provider.getDataBuffer', {error: exception.message})
        }
      }
    }
  },
  /**
   * Met en place les ecouteurs d'evenements IPC.
   */
  setEventListeners () {
    ipcMain.on('REQ:CriteriaSet.resolveDecisiveCriteriaSets', (...args) => {
      this.handlers.CriteriaSet.resolveDecisiveCriteriaSets(...args)
    })

    ipcMain.on('REQ:CriteriaSet.resolveCriteriaByType', (...args) => {
      this.handlers.CriteriaSet.resolveCriteriaByType(...args)
    })

    ipcMain.on('REQ:Provider.getDataBuffer', (...args) => {
      this.handlers.Provider.getDataBuffer(...args)
    })
  }
}

export default IPCHandler
