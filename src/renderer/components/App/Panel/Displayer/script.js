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
    /**
     * Met a jour les elements du panel lors de l'ajout d'ensembles de criteres determinants.
     */
    decisiveCriteriaSetsStoreUpdateHandler () {
      this.$store.dispatch('panel/loadCurrentPanelElements')
    }
  },

  /**
   * Fonction lancee quand le composant est monte.
   * Met en place l'ecouteur d'evenement IPC pour la mise a jour des ensembles de criteres determinants
   */
  mounted () {
    ipcRenderer.on('EVENT:DCSStore.updated', debounce(this.decisiveCriteriaSetsStoreUpdateHandler, 1000, {
      leading: true,
      maxWait: 1000
    }))
  }
}
