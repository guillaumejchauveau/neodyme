/**
 * @file Tests du gestionnaire de requetes IPC.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import { expect } from 'chai'
import sinon from 'sinon'
import { ipcMain } from 'electron'

/**
 * Gestionnaire de requetes IPC.
 * @type {Object}
 */
import IPCHandler from '../../src/main/IPCHandler'

describe('IPCHandler', function () {
  before(function () {
    sinon.spy(ipcMain, 'on')
  })

  /**
   * Test la mise en place des ecouteurs d'evenement.
   */
  it('should set event listeners', function () {
    IPCHandler.setEventListeners()

    // eslint-disable-next-line
    expect(ipcMain.on.called, 'Method \'on\' should be called at least once.').to.be.ok
  })

  after(function () {
    ipcMain.on.restore()
  })
})
