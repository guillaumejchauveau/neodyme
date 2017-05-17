/**
 * @file Script du composant 'Displayer'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import debounce from 'lodash.debounce'
import { ipcRenderer } from 'electron'
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
    ...mapGetters('panel', [
      'getCurrentPanelConfig',
      'getCurrentPanelElements',
      'isEmptyDisplayer'
    ])
  },

  methods: {
    DCSStoreUpdateHandler () {
      this.$store.dispatch('panel/loadCurrentPanelElements')
    }
  },

  mounted () {
    ipcRenderer.on('EVENT:DCSStore.updated', debounce(this.DCSStoreUpdateHandler, 1000, {
      leading: true,
      maxWait: 1000
    }))
  }
}
