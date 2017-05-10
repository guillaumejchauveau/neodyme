/**
 * @file Composant MDC/Menu.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import { MDCSimpleMenu } from '@material/menu'

export default {
  methods: {
    /**
     * Bascule l'ouverture du menu.
     */
    toggle () {
      this.mdc_menu_.open = !this.mdc_menu_.open
    }
  },
  props: {
    /**
     * Le bouton du menu est-il horizontal.
     */
    horiz: {
      type: Boolean,
      'default': false
    }
  },
  mounted () {
    this.mdc_menu_ = new MDCSimpleMenu(this.$el.children[1])
  },
  beforeDestroy () {
    this.mdc_menu_.destroy()
    delete this.mdc_menu_
  }
}
