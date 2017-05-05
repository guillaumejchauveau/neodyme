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
    ...mapGetters('panel', ['getCurrentPanelConfig',
                            'getCurrentPanelElements']),
  }
}
