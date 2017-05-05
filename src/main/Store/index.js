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

  /**
   * Recupere un objet.
   * @param key {String}
   * @returns {*}
   */
  get (key) {
    return this.store[key]
  }

  /**
   * Definit un objet.
   * @param key {String}
   * @param value {*}
   */
  set (key, value) {
    this.store[key] = value
  }

  /**
   * Supprime un objet.
   * @param key {String}
   */
  remove (key) {
    delete this.store[key]
  }
}

export default Store
