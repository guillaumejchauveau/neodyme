/**
 * @file Script du composant 'Displayer'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import { mapGetters } from 'vuex'

import Item from './Item'
import List from './List'

export default {
  components: {
    Item,
    List
  },

  computed: {
    ...mapGetters('panel', [
      'getCurrentPanelConfig',
      'getCurrentPanelElements'
    ])
  }
}
