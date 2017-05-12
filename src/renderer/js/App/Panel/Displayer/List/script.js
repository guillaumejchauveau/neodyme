/**
 * @file Script du composant 'List'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import { mapGetters, mapMutations, mapActions } from 'vuex'

/**
 * Composant ListRow.
 */
import ListRow from './ListRow'
/**
 * Composant ListHeaderTag.
 */
import ListHeaderTag from './ListHeaderTag'

export default {
  name: 'list',
  components: {
    'listrow': ListRow,
    'listheadertag': ListHeaderTag
  },

  computed: {
    ...mapGetters('panel', [
      'getCurrentPanelElements',
      'getSelectedListRow'
    ])
  },

  methods: {
    ...mapMutations('panel', ['SET_SELECTEDLISTROW']),
    ...mapActions('playlist', ['addDecisiveCriteriaSet', 'clear', 'play']),

     /**
      * Lit un titre et ajoute tout les titres affiches a la playlist.
      * @param {String} selectedElement - Le titre a lire.
      * @throws {Error} Lance une exception si l'effacement de la liste de lecture echoue.
      * @throws {Error} Lance une exception si le lancement de la lecture echoue.
      */
    playNow (selectedElement) {
      // Verifie que le titre n'est pas selectionne dans la liste.
      if (this.getSelectedListRow === selectedElement) {
        // Deselectionne le titre.
        this.SET_SELECTEDLISTROW()
      }

      // Arrete et efface la liste de lecture.
      this.clear().then(() => {
        // Ajoute les ensembles de criteres determinants du panel a la liste de lecture.
        this.getCurrentPanelElements
            .decisiveCriteriaSets
            .forEach(decisiveCriteriaSet => {
              this.addDecisiveCriteriaSet(decisiveCriteriaSet)
            })

        // Lance la lecture du titre selectionne.
        this.play(this.getCurrentPanelElements
                      .decisiveCriteriaSets
                      .indexOf(selectedElement))
            .catch(err => {
              throw new Error(err)
            })
      }).catch(err => {
        throw new Error(err)
      })
    }
  }
}
