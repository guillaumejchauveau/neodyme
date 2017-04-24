/**
 * @file Script du composant 'List'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import {mapState, mapActions, mapGetters} from 'vuex'

import ListRow from './ListRow'

export default {
  components: {
    ListRow,
  },

  props: ['elements'],

  data: () => {
    return {
      fakeElements: [{criteria: {trackNumber:   {value: '1'},
                                      title:    {value: 'Sonate pour piano n°5'},
                                      album:    {value: 'Musique Classique'},
                                      artist:   {value: 'Beethoven'},
                                      duration: {value: '05:31'}}},
                      {criteria: {trackNumber:  {value: '2'},
                                      title:    {value: 'Sonate pour piano n°5'},
                                      album:    {value: 'Musique Classique'},
                                      artist:   {value: 'Beethoven'},
                                      duration: {value: '05:31'}}},
                      {criteria: {trackNumber:  {value: '3'},
                                      title:    {value: 'Sonate pour piano n°5'},
                                      album:    {value: 'Musique Classique'},
                                      artist:   {value: 'Beethoven'},
                                      duration: {value: '05:31'}}},
                      {criteria: {trackNumber:  {value: '4'},
                                      title:    {value: 'Sonate pour piano n°5'},
                                      album:    {value: 'Musique Classique'},
                                      artist:   {value: 'Beethoven'},
                                      duration: {value: '05:31'}}},
                              ]
    }
  },

  computed: {
    ...mapState('panel', ['currentPanelElements']),
    sortedElements () {
      return this.fakeElements.sort( (a, b) => {
        return parseFloat(a.criteria.trackNumber.value) - parseFloat(b.criteria.trackNumber.value)
      })
    }
  },

  methods: {
    ...mapActions('panel', ['loadCurrentPanelElements'])
  }
}
