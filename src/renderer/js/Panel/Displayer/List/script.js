/**
 * @file Script du composant 'List'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'

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
    },

    /**
     * Joue un titre et ajoute tout les titres affichés a la playlist.
     * @param {String} selectedElement - Le titre selectione.
     */
    play (selectedElement) {
      //STOP
      this.CLEAR_TRACKS()
      this.sortedElements.forEach(el => {
        this.addDecisiveCriteriaSet(el)
      })
      const selectedElementIndex = this.sortedElements.indexOf(selectedElement)
      this.SET_CURRENT_TRACK(selectedElementIndex)
      //PLAY
    }
  }
}
