/**
 * @file Tests du module Liste de lecture du Store.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import chai from 'chai'

/**
 * Module Liste de lecture du Store.
 */
import Playlist from '../../../src/renderer/js/Store/Playlist'

chai.use(require('dirty-chai'))

const expect = chai.expect

/**
 * 'state'
 */
describe('Store/Playlist', function () {
  before(function () {
    this.state = Playlist.state
  })

  describe('Mutations', function () {
    it('ADD_TRACK', function () {

    })

    it('SET_CURRENT_TRACK', function () {

    })

    it('REMOVE_TRACK', function () {

    })

    it('CLEAR_TRACKS', function () {

    })
  })

  describe('Getters', function () {
    before(function () {

    })

    it('tracksCount', function () {

    })

    it('currentTrack', function () {

    })

    after(function () {

    })
  })

  after(function () {
    delete this.state
  })
})