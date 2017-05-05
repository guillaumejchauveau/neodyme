/**
 * @file Directive VueJS pour appliquer l'effet Ripple.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import {MDCRipple} from '@material/ripple'

export default {
    bind (el, context) {
        el.mdc_ripple_ = MDCRipple.attachTo(el, {isUnbounded: context.modifiers.unbounded})
    },
    unbind (el, context) {
        if (!el.mdc_ripple_) {
            return
        }
        el.mdc_ripple_.destroy()
        delete el.mdc_ripple_
    }
}
