/**
 * @file Script du composant 'ListHeaderTag'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'listheadertag',

  props: ['tagValue', 'tagTitle'],

  computed: {
    ...mapGetters('panel', ['getActiveSortCriterionType', 'isRevertSort'])
  },

  methods: {
    ...mapMutations('panel', ['SET_SELECTEDLISTROW']),
    ...mapActions('panel', ['setCurrentPanelElementsSorting']),

    /**
     * Change le type de critere de tri ou inverse l'ordre de tri.
     * @param {String} selectedSortCriteriaType - Le nouveau type critère de tri
     */
    activateSort (selectedSortCriteriaType) {
      this.SET_SELECTEDLISTROW()
      if (selectedSortCriteriaType === this.getActiveSortCriterionType) {
        this.setCurrentPanelElementsSorting()
      } else {
        this.setCurrentPanelElementsSorting(selectedSortCriteriaType)
      }
    }
  }
}
