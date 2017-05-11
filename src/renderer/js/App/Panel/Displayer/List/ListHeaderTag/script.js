/**
 * @file Script du composant 'ListHeaderTag'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'listheadertag',

  props: {
    /**
     * Type de critere de tri accocie.
     * @type {String}
     */
    tagValue: {
      type: String,
      required: true
    },
    /**
     * Titre du tag.
     * @type {String}
     */
    tagTitle: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters('panel', ['getActiveSortCriterionType', 'isRevertSort'])
  },

  methods: {
    ...mapMutations('panel', ['SET_SELECTEDLISTROW']),
    ...mapActions('panel', ['setCurrentPanelElementsSorting']),

    /**
     * Change le type de critere de tri ou inverse l'ordre de tri.
     * @param {String} selectedSortCriteriaType - Le nouveau type critère de tri.
     */
    activateSort (selectedSortCriteriaType) {
      // Deselectionne le titre seletionne
      this.SET_SELECTEDLISTROW()

      // Si le type de critere de tri est deja actif, invert l'ordre de tri,
      // sinon definit le nouveau type de critere de tri.
      if (selectedSortCriteriaType === this.getActiveSortCriterionType) {
        this.setCurrentPanelElementsSorting()
      } else {
        this.setCurrentPanelElementsSorting(selectedSortCriteriaType)
      }
    }
  }
}
