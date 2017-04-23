
import Criterion from '../../../Criterion'
import CriteriaSet from '../../../Criterion/CriteriaSet'

  import { mapGetters, mapActions, mapState} from 'vuex'
  import mdcMenu from '../../../MDC/Menu/index.vue'

  export default {
    components: {
      mdcMenu,
    },

    props: ['criteriaSet'],

    methods: {
      ...mapActions ('panel', {
        setNextPanelConfig: 'setNextPanelConfig',
        loadCurrentPanelElements: 'loadCurrentPanelElements'
      }),

      setNextPanel (newCriterion) {
        this.setNextPanelConfig(newCriterion)
        this.loadCurrentPanelElements()
      },

      play () {
        console.log('PLAY')
      },
      playAfter () {
        console.log('PLAYAFTER')
      },
      addToPlaylist () {
        console.log('ADD2PL')
      },
    },

    computed: {
      ...mapState('panel', ['currentPanelConfig']),
      ...mapGetters({
        getNextPanelConfigCriterionType: 'panel/getNextPanelConfigCriterionType'
      }),

      itemName () {
        console.log();
        return this.criteriaSet.criteria[this.currentPanelConfig.criterionType].value
      },

      newCriterion () {
        return new Criterion(this.currentPanelConfig.criterionType, this.itemName)
      }
    }
  }
