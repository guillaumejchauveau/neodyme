/**
 * @file Script du composant 'List'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

<<<<<<< HEAD
import { mapGetters, mapMutations, mapActions } from 'vuex'
=======
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127

/**
 * Classe DecisiveCriteriaSet.
 * @type {DecisiveCriteriaSet}
 */
import DecisiveCriteriaSet from '../../../Criterion/CriteriaSet/DecisiveCriteriaSet'

import ListRow from './ListRow'

export default {
  components: {
    ListRow,
  },

<<<<<<< HEAD
  computed: {
    ...mapGetters('panel', ['getCurrentPanelElements',
                            'getActiveSortCriterionType',
                            'getSelectedListRow',
                            'isRevertSort']),
  },

  methods: {
    ...mapMutations('playlist', ['CLEAR_TRACKS', 'SET_CURRENT_TRACK']),
    ...mapMutations('panel', ['SET_SELECTEDLISTROW']),
    ...mapActions('playlist', ['addDecisiveCriteriaSet']),
    ...mapActions('panel', ['setCurrentPanelElementsSorting']),


    toggleRevertSort () {
      this.SET_SELECTEDLISTROW()
      this.setCurrentPanelElementsSorting()
    },

    activateSort (selectedSortCriteriaType) {
      this.SET_SELECTEDLISTROW()
      this.setCurrentPanelElementsSorting(selectedSortCriteriaType)
=======
  data: () => {
    return {
      // Les types de critere de tri. 3 etats possibles (null, default, invert).
      sortCriteriaTypes: {trackNumber: 'default',
                          title: null,
                          album: null,
                          artist: null,
                          duration: null
      },

    }
  },

  computed: {
    ...mapState('panel', ['currentPanelElements']),

    sortCriteriaTypesPriority () {
      return [this.activeSort,
              'trackNumber',
              'album',
              'artist',
              'title',
              'duration']
    },

    /**
     * Trie les elements de la liste selon le type de critere de tri selectione et le sens du tri.
     * @return {Array<DecisiveCriteriaSet>} La liste des element a afficher triee.
     */
    sortedElements () {
      //Trie les elements selon le crit de tri actif.
      const sortedElements = this.currentPanelElements.decisiveCriteriaSets.sort((a, b) => {
        this.sortCriteriaTypesPriority.forEach(sortCriteriaType => {
          const aValue = a.criteria[sortCriteriaType].value
          const bValue = b.criteria[sortCriteriaType].value
          if (aValue < bValue) {
            return -1
          }
          if (aValue > bValue) {
            return 1
          }
        })
      })

      //Inverse ou non le tri.
      if (this.sortCriteriaTypes[this.activeSort] === 'default') {
        return sortedElements
      } else if (this.sortCriteriaTypes[this.activeSort] === 'invert') {
        return sortedElements.reverse()
      }
    },

    /**
     * Renvoie le type de critere de tri en cours.
     * @return {String} le type de critere de tri en cours.
     */
    activeSort () {
      for (const sortCriteriaType in this.sortCriteriaTypes) {
        if (this.sortCriteriaTypes.hasOwnProperty(sortCriteriaType) & this.sortCriteriaTypes[sortCriteriaType] !== 'disabled') {
          return sortCriteriaType
        }
      }
    }
  },

  methods: {
    ...mapActions('playlist', ['addDecisiveCriteriaSet']),
    ...mapMutations('playlist', ['CLEAR_TRACKS', 'SET_CURRENT_TRACK']),

    /**
     * Change les l'etat d'un selecteur de tri en 'invert'.
     * @param {String} selectedSortCriteriaType - Le selecteur de tri.
     */
    revertSort (selectedSortCriteriaType) {
      if (this.sortCriteriaTypes[selectedSortCriteriaType] === 'default') {
        this.sortCriteriaTypes[selectedSortCriteriaType] = 'invert'
      } else {
        this.sortCriteriaTypes[selectedSortCriteriaType] = 'default'
      }
    },

    /**
     * Active un selecteur de tri.
     * @param {String} selectedSortCriteriaType - Le selecteur de tri.
     */
    activateSort (selectedSortCriteriaType) {
      for (const sortCriteriaType in this.sortCriteriaTypes) {
        if (this.sortCriteriaTypes.hasOwnProperty(sortCriteriaType)) {
          this.sortCriteriaTypes[sortCriteriaType] = 'disabled'
          if (sortCriteriaType == selectedSortCriteriaType) {
            this.sortCriteriaTypes[sortCriteriaType] = 'default'
          }
        }
      }
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
    },

    /**
     * Joue un titre et ajoute tout les titres affichés a la playlist.
     * @param {String} selectedElement - Le titre selectione.
     */
    play (selectedElement) {
      //STOP
<<<<<<< HEAD
      if (this.getSelectedListRow === selectedElement) {
        this.SET_SELECTEDLISTROW()
      }
      this.CLEAR_TRACKS()
      this.getCurrentPanelElements.decisiveCriteriaSets.forEach(DCS => {
        this.addDecisiveCriteriaSet(DCS)
      })
      const selectedElementIndex = this.getCurrentPanelElements.decisiveCriteriaSets.indexOf(selectedElement)
=======
      this.CLEAR_TRACKS()
      this.sortedElements.forEach(el => {
        this.addDecisiveCriteriaSet(el)
      })
      const selectedElementIndex = this.sortedElements.indexOf(selectedElement)
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
      this.SET_CURRENT_TRACK(selectedElementIndex)
      //PLAY
    }
  }
}
