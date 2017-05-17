/**
 * @file Tests du composant principal.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import chai from 'chai'
import sinon from 'sinon'
import Vue from 'vue'
import vuex from 'vuex'

chai.use(require('dirty-chai'))
const expect = chai.expect
Vue.use(vuex)

describe('App', function () {
  before(function () {
    this.vm = new Vue(require('../../../src/renderer/js/App/index.vue'))

    sinon.spy(window, 'addEventListener')
    sinon.spy(window, 'removeEventListener')
  })

  it('should set event listeners on mount', function (done) {
    this.vm.$mount()
    this.vm.$nextTick(() => {
      expect(window.addEventListener.called,
        'Method \'addEventListener\' should be called at least once.')
      .to.be.true()
      done()
    })
  })

  it('should unset event listeners on mount', function () {
    this.vm.$destroy()
    expect(window.addEventListener.called,
      'Method \'removeEventListener\' should be called at least once.')
    .to.be.true()
  })

  after(function () {
    window.addEventListener.restore()
    window.removeEventListener.restore()

    delete this.vm
  })
})
