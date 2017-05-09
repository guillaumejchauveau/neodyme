/**
 * @file Tests du module Parametres du Store.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import chai from 'chai'

/**
 * Module Parametres  du Store.
 */
import Settings from '../../../src/renderer/js/Store/Settings'

chai.use(require('dirty-chai'))

const expect = chai.expect

describe('Store/Settings', function () {
  describe('Mutations', function () {
    it('UPDATE_WINDOW_SIZE', function () {
      const state = {
        windowSize: {
          height: 0,
          width: 0
        }
      }
      Settings.mutations.UPDATE_WINDOW_SIZE(state)

      expect(state.windowSize.height).to.equal(window.innerHeight)
      expect(state.windowSize.width).to.equal(window.innerWidth)
    })
  })
})
