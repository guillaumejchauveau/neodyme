/**
 * @file Script du composant 'Displayer'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import { mapGetters } from 'vuex'

 /**
  * Classe Criterion.
  * @type {Criterion}
  */
 import Criterion from '../../Criterion'
 /**
  * Classe CriteriaSet.
  * @type {CriteriaSet}
  */
import CriteriaSet from '../../Criterion/CriteriaSet'

import Item from './Item'
import List from './List'

export default {
  components: {
    Item,
    List,
  },

  computed: {
<<<<<<< HEAD
    ...mapGetters('panel', ['getCurrentPanelConfig',
                            'getCurrentPanelElements']),
=======
    ...mapState ('panel', ['currentPanelConfig', 'currentPanelElements']),

    sortedCriteriaSets () {
      const currentCriterionType = this.currentPanelConfig.criterionType
      const sortedCriteriaSets   = this.currentPanelElements.criteriaSets.sort((a, b) => {
        let aValue = a.criteria[currentCriterionType].value
        let bValue = b.criteria[currentCriterionType].value
        if (aValue < bValue) {
          return -1
        }
        if (aValue > bValue) {
          return 1
        }
        return 0
      })
      return sortedCriteriaSets
    }
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
  }
}
