/**
 * @file Definit la classe Store.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Stockeur.
 * @property {Object} store - Les valeurs stockees.
 */
class Store {
  /**
   * Cree un stockeur.
   */
  constructor () {
    this.store = {}
  }

  get (key) {
    return this.store[key]
  }

  set (key, value) {
    this.store[key] = value
  }

  remove (key) {
    delete this.store[key]
  }
}

export default Store
