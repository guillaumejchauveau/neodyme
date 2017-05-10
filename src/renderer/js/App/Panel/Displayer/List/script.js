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
     * Joue un titre et ajoute tout les titres affichés a la playlist.
     * @param {String} selectedElement - Le titre selectione.
     */
    playNow (selectedElement) {
      if (this.getSelectedListRow === selectedElement) {
        this.SET_SELECTEDLISTROW()
      }

      this.clear().then(() => {
        this.getCurrentPanelElements
            .decisiveCriteriaSets
            .forEach(DCS => {
              this.addDecisiveCriteriaSet(DCS)
            })

        this.play(this.getCurrentPanelElements
                      .decisiveCriteriaSets
                      .indexOf(selectedElement))
      }).catch(err => {
        throw err
      })
    }
  }
}
