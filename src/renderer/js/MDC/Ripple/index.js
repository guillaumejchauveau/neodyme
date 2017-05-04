/**
 * @file Directive VueJS pour appliquer l'effet Ripple.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import { MDCRipple, MDCRippleFoundation } from '@material/ripple'

export default {
  bind (el, context) {
    el.mdc_ripple_ = new MDCRipple(el, new MDCRippleFoundation({isUnbounded: context.modifiers.unbounded}))
  },
  unbind (el) {
    if (!el.mdc_ripple_) {
      return
    }
    el.mdc_ripple_.destroy()
    delete el.mdc_ripple_
  }
}
