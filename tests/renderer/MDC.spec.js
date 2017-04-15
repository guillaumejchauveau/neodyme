/**
 * @file Tests des composants MDC.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import chai from 'chai'
import Vue from 'vue'
import { MDCCheckbox } from '@material/checkbox'
import { MDCSimpleMenu } from '@material/menu'

/**
 * Composant MDC/Checkbox
 */
import MDCCheckboxComponent from '../../src/renderer/js/MDC/Checkbox'
/**
 * Composant MDC/Menu
 */
import MDCMenuComponent from '../../src/renderer/js/MDC/Menu'

chai.use(require('dirty-chai'))
chai.use(require('chai-dom'))

const expect = chai.expect

describe('MDC', function () {
  describe('Checkbox', function () {
    before(function () {
      this.vm = new Vue(MDCCheckboxComponent)
      this.vm.$mount()
    })

    it('should have @material/menu/MDCCheckbox attached', function () {
      expect(this.vm).to.have.ownProperty('mdc_checkbox_')
      expect(this.vm.mdc_checkbox_).to.be.an.instanceof(MDCCheckbox)
    })

    after(function () {
      this.vm.$destroy()
      delete this.vm
    })
  })

  describe('Menu', function () {
    before(function () {
      this.vm = new Vue(MDCMenuComponent)
      this.vm.$mount()
    })

    it('should have @material/menu/MDCSimpleMenu attached', function () {
      expect(this.vm).to.have.ownProperty('mdc_menu_')
      expect(this.vm.mdc_menu_).to.be.an.instanceof(MDCSimpleMenu)
    })

    it('should be toggleable', function (done) {
      expect(this.vm.$el.children[1]).to.not.have.class('mdc-simple-menu--open')
      this.vm.toggle()

      this.vm.$nextTick(() => {
        expect(this.vm.$el.children[1]).to.have.class('mdc-simple-menu--animating')
        done()
      })
    })

    after(function () {
      this.vm.$destroy()
      delete this.vm
    })
  })
})
