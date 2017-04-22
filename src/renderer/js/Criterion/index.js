/**
 * @file Definit la classe Criterion.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import settings from '../Store/Settings'

/**
 * Classe qui represente un critere.
 * @property {String} type  - Le type du critere.
 * @property {*}      value - La valeur du critere.
 */
class Criterion {
    /**
     * Cree un critere.
     * @param {String} type  - Le type du critere.
     * @param {*}      value - La valeur du critere.
     * @throws Lance une exception si le type de critere n'est pas pris en charge.
     */
    constructor(type, value) {
        if (!Criterion.checkType(type)) {
            throw `Unrecognized criterion type: ${type}`
        }      

        this.type  = type
        this.value = value
    }

    /**
     * Verifie que le type de critere est pris en charge.
     * @param {String} type
     * @returns {Boolean} Resultat du test.
     */
    static checkType(type) {
        return settings.state.criterion.types.indexOf(type) !== -1
    }
}

export default Criterion
