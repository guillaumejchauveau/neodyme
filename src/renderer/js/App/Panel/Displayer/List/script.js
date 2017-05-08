/**
 * @file Script du composant 'List'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import { mapGetters, mapMutations, mapActions } from 'vuex'

import ListRow from './ListRow'

export default {
  components: {
    ListRow
  },

  computed: {
    ...mapGetters('panel', [
      'getCurrentPanelElements',
      'getActiveSortCriterionType',
      'getSelectedListRow',
      'isRevertSort'
    ])
  },

  methods: {
    ...mapMutations('panel', ['SET_SELECTEDLISTROW']),
    ...mapActions('playlist', ['addDecisiveCriteriaSet', 'clear', 'play']),
    ...mapActions('panel', ['setCurrentPanelElementsSorting']),

    toggleRevertSort () {
      this.SET_SELECTEDLISTROW()
      this.setCurrentPanelElementsSorting()
    },

    activateSort (selectedSortCriteriaType) {
      this.SET_SELECTEDLISTROW()
      this.setCurrentPanelElementsSorting(selectedSortCriteriaType)
    },

    /**
     * Joue un titre et ajoute tout les titres affichés a la playlist.
     * @param {String} selectedElement - Le titre selectione.
     */
    playNow (selectedElement) {
      if (this.getSelectedListRow === selectedElement) {
        this.SET_SELECTEDLISTROW()
      }
      this.clear().then(() => {
        this.getCurrentPanelElements.decisiveCriteriaSets.forEach(DCS => {
          this.addDecisiveCriteriaSet(DCS)
        })
        const selectedElementIndex = this.getCurrentPanelElements.decisiveCriteriaSets.indexOf(selectedElement)
        this.play(selectedElementIndex)
      }).catch(err => {
        throw err
      })
    }
  }
}
