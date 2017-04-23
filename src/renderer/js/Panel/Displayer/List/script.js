import ListRow from './ListRow'
import {mapState, mapActions, mapGetters} from 'vuex'

export default {
  components: {
    ListRow,
  },
  props: [
    'elements'],

  computed: {
    ...mapState('panel', ['currentList']),
    ...mapGetters('panel', ['list']),
    sortedElements () {
      console.log(this.currentList)
      return this.list.sort( (a, b) => {
        return parseFloat(a.criteria.trackNumber.value) - parseFloat(b.criteria.trackNumber.value)
      })
    }
  },
  methods: {
    ...mapActions('panel', {
      loadCurrentPanelElements: 'loadCurrentPanelElements'
    })
  }
}
