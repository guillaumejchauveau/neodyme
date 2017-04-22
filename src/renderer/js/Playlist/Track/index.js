/**
 * @file Definit la classe Track.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Classe DecisiveCriteriaSet.
 * @type {DecisiveCriteriaSet}
 */
import DecisiveCriteriaSet from '../../Criterion/CriteriaSet/DecisiveCriteriaSet'

/**
 * Classe qui represente une piste.
 * @property {DecisiveCriteriaSet} dcs        - L'ensemble de criteres determinant original.
 * @property {ArrayBuffer}         dataBuffer - Les donnees brutes recuperees.
 */
class Track {
    /**
     * Cree une piste a partir d'un ensemble de criteres determinant.
     * @param decisiveCriteriaSet
     * @throws Lance une exception si l'ensemble de criteres determinant n'est pas valide.
     */
    constructor(decisiveCriteriaSet) {
        if (!(decisiveCriteriaSet instanceof DecisiveCriteriaSet)) {
            throw 'Invalid decisiveCriteriaSet'
        }
        
        this.dcs        = decisiveCriteriaSet
        this.dataBuffer = null
    }
    
    /**
     * Recupere les donnees brutes.
     * @returns {Promise}
     */
    loadDataBuffer() {
        return new Promise((resolve, reject) => {
            if (!this.dataBuffer) {
                this.dcs
                    .getDataBuffer()
                    .then(dataBuffer => {
                        this.dataBuffer = dataBuffer
                        resolve()
                    })
                    .catch(function () {
                        reject()
                    })
            } else {
                resolve()
            }
        })
    }
}

export default Track
