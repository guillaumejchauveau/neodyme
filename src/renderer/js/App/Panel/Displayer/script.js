/**
 * @file Script du composant 'Displayer'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import { mapGetters } from 'vuex'

/**
 * Composant Item.
 */
import Item from './Item'
/**
 * Composant List.
 */
import List from './List'

export default {
  name: 'displayer',
  components: {
    'item': Item,
    'list': List
  },

  computed: {
    ...mapGetters('panel', ['getCurrentPanelConfig', 'getCurrentPanelElements'])
  }
}
