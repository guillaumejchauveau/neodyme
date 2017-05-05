/**
 * @file Tests des objects lies aux criteres.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import chai from 'chai'

/**
 * Classe Criterion.
 * @type {Criterion}
 */
import Criterion from '../../src/renderer/js/Criterion'
/**
 * Classe CriteriaSet.
 * @type {CriteriaSet}
 */
import CriteriaSet from '../../src/renderer/js/Criterion/CriteriaSet'
/**
 * Classe DecisiveCriteriaSet.
 * @type {DecisiveCriteriaSet}
 */
import DecisiveCriteriaSet from '../../src/renderer/js/Criterion/CriteriaSet/DecisiveCriteriaSet'

chai.use(require('dirty-chai'))

const expect = chai.expect

describe('Criterion', function () {
  /**
   * Test la verification du type de critere.
   */
  it('should check if the type is handled', function () {
    expect(Criterion.checkType('artist')).to.be.true()
    expect(Criterion.checkType('foo')).to.be.false()

    // eslint-disable-next-line
    expect(() => { new Criterion('artist', 'John Doe') }).to.not.throw(TypeError)
    // eslint-disable-next-line
    expect(() => { new Criterion('foo', 'bar') }).to.throw(TypeError)
  })

  /**
   * Test si le critere a bien les parametres demandes.
   */
  it('should create a criterion with correct parameters', function () {
    const criterion = new Criterion('artist', 'John Doe')

    expect(criterion).to.have.property('type')
    expect(criterion.type).to.equal('artist')
    expect(criterion).to.have.property('value')
    expect(criterion.value).to.equal('John Doe')
  })

  /**
   * 'criterion' {Criterion}: - {Criterion}: 'artist' = 'John Doe'
   * 'criteriaSet' {CriteriaSet}
   */
  describe('CriteriaSet', function () {
    before(function () {
      this.criterion = new Criterion('artist', 'John Doe')
      this.criteriaSet = new CriteriaSet()
    })

    /**
     * Test l'ajout d'un critere.
     */
    it('should add criterion', function () {
      expect(() => { this.criteriaSet.add(this.criterion) }).to.not.throw(TypeError)
      expect(this.criteriaSet.criteria).to.have.ownProperty(this.criterion.type)
      expect(this.criteriaSet.criteria[this.criterion.type]).to.equal(this.criterion)

      expect(() => { this.criteriaSet.add({wrong: 'object'}) }).to.throw(TypeError)
    })

    /**
     * Test la suppression d'un critere.
     */
    it('should remove criterion', function () {
      this.criteriaSet.remove(this.criterion.type)
      expect(this.criteriaSet.criteria).to.not.have.ownProperty(this.criterion.type)
    })

    /**
     * Test la conversion d'empreinte d'ensemble de criteres.
     */
    it('should create a criteriaSet from a criteriaSetFootprint', function () {
      const criteriaSetFootprint = {
        criteria: {
          artist: {
            type: 'artist',
            value: 'John Doe'
          }
        }
      }

      expect(() => {
        CriteriaSet.convertCriteriaSetFootprint(criteriaSetFootprint)
      }).to.not.throw(TypeError)

      const criteriaSet = CriteriaSet.convertCriteriaSetFootprint(criteriaSetFootprint)
      expect(criteriaSet).to.be.instanceof(CriteriaSet)

      for (const criterionType in criteriaSet.criteria) {
        if (criteriaSet.criteria.hasOwnProperty(criterionType)) {
          const criterion = criteriaSet.criteria[criterionType]
          expect(criterion.value).to.equal(criteriaSetFootprint.criteria[criterionType].value)
        }
      }

      expect(() => {
        CriteriaSet.convertCriteriaSetFootprint('wrong type')
      }).to.throw(TypeError)
      expect(() => {
        CriteriaSet.convertCriteriaSetFootprint({
          missing: 'key'
        })
      }).to.throw(TypeError)
    })

    describe('DecisiveCriteriaSet', function () {
      /**
       * Test si DecisiveCriteriaSet verifie la validite de la clef de la source.
       */
      it('should create a decisiveCriteriaSet with a valid provider', function () {
        expect(() => {
          // eslint-disable-next-line
          new DecisiveCriteriaSet({
            providerKey: 0,
            id: ''
          })
        }).to.not.throw(TypeError)

        expect(() => {
          // eslint-disable-next-line
          new DecisiveCriteriaSet('wrong type')
        }).to.throw(TypeError)
        expect(() => {
          // eslint-disable-next-line
          new DecisiveCriteriaSet({wrong: 'object'})
        }).to.throw(TypeError)
        expect(() => {
          // eslint-disable-next-line
          new DecisiveCriteriaSet({
            providerKey: 'wrong type',
            id: ''
          })
        }).to.throw(TypeError)
      })
    })

    after(function () {
      delete this.criterion
      delete this.criteriaSet
    })
  })
})
