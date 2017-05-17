/**
 * @file Composant MDC/Checkbox.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import { MDCCheckbox } from '@material/checkbox'

export default {
  mounted () {
    this.mdc_checkbox_ = new MDCCheckbox(this.$el)
  },
  beforeDestroy () {
    this.mdc_checkbox_.destroy()
    delete this.mdc_checkbox_
  }
}
