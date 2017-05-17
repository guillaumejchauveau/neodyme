/**
 * @file Tests des objects lies aux criteres.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import { expect } from 'chai'

/**
 * Conteneur d'injection de dependances.
 * @type {Object}
 */
import DIC from '../../src/main/DependencyInjectionContainer'
/**
 * Classe Store.
 * @type {Store}
 */
import Store from '../../src/main/Store'
/**
 * Classe DecisiveCriteriaSetStore.
 * @type {Store}
 */
import DecisiveCriteriaSetStore from '../../src/main/Store/DecisiveCriteriaSetStore'
/**
 * Classe Criterion.
 * @type {Criterion}
 */
import Criterion from '../../src/main/Criterion'
/**
 * Classe CriteriaSet.
 * @type {CriteriaSet}
 */
import CriteriaSet from '../../src/main/Criterion/CriteriaSet'
/**
 * Classe DecisiveCriteriaSet.
 * @type {DecisiveCriteriaSet}
 */
import DecisiveCriteriaSet from '../../src/main/Criterion/CriteriaSet/DecisiveCriteriaSet'
/**
 * Classe Provider.
 * @type {Provider}
 */
import Provider from '../../src/main/Provider'

/**
 * 'DIC' -> 'ConfigurationStore' {Store} -> 'criterion' -> 'types': - 'artist'
 *                                                                  - 'album'
 */
describe('Criterion', function () {
  before(function () {
    const config = new Store()
    DIC.set('ConfigurationStore', config)

    // Types de criteres pris en charge.
    config.set('criterion', {
      types: [
        'artist',
        'album'
      ]
    })
  })

  /**
   * Test la verification du type de critere.
   */
  it('should check if the type is handled', function () {
    expect(Criterion.checkType('artist')).to.be.true()
    expect(Criterion.checkType('foo')).to.be.false()

    expect(() => {
      // eslint-disable-next-line
      new Criterion('artist', 'John Doe')
    }).to.not.throw(TypeError)
    expect(() => {
      // eslint-disable-next-line
      new Criterion('foo', 'bar')
    }).to.throw(TypeError)
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
      expect(() => {
        this.criteriaSet.add(this.criterion)
      }).to.not.throw(TypeError)
      expect(this.criteriaSet.criteria).to.have.ownProperty(this.criterion.type)
      expect(this.criteriaSet.criteria[this.criterion.type]).to.equal(this.criterion)

      expect(() => {
        this.criteriaSet.add({
          wrong: 'object'
        })
      }).to.throw(TypeError)
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

    /**
     * 'provider' {Provider}: - 'key' = 0
     * DIC -> ConfigurationStore -> 'providers': - provider
     */
    describe('DecisiveCriteriaSet', function () {
      before(function () {
        this.provider = new Provider({
          key: 0,
          typeMappers: [
            () => null,
            () => null
          ]
        })
        DIC.get('ConfigurationStore').set('providers', [this.provider])
      })

      /**
       * Test si DecisiveCriteriaSet verifie la validite de la source.
       */
      it('should create a decisiveCriteriaSet with a valid provider', function () {
        expect(() => {
          // eslint-disable-next-line
          new DecisiveCriteriaSet({
            provider: this.provider,
            id: ''
          })
        }).to.not.throw(TypeError)

        expect(() => {
          // eslint-disable-next-line
          new DecisiveCriteriaSet('wrong type')
        }).to.throw(TypeError)
        expect(() => {
          // eslint-disable-next-line
          new DecisiveCriteriaSet({
            wrong: 'object'
          })
        }).to.throw(TypeError)
        expect(() => {
          // eslint-disable-next-line
          new DecisiveCriteriaSet({
            provider: 'wrong type',
            id: ''
          })
        }).to.throw(TypeError)
        expect(() => {
          // eslint-disable-next-line
          new DecisiveCriteriaSet({
            provider: new Provider({
              key: 1,
              typeMappers: [
                () => null,
                () => null
              ]
            }),
            id: ''
          })
        }, 'Provider with key 1 should not exist.')
        .to.throw(ReferenceError)
        expect(() => {
          // eslint-disable-next-line
          new DecisiveCriteriaSet({
            provider: new Provider({
              key: this.provider.config.key,
              typeMappers: [
                () => null,
                () => null
              ]
            }),
            id: ''
          })
        }, 'Provider instance should not correspond to the registered one (same key but not same instance).')
        .to.throw(ReferenceError)
      })

      after(function () {
        delete this.provider
        DIC.get('ConfigurationStore').remove('providers')
      })
    })

    /**
     * DIC -> ConfigurationStore -> 'providers': - provider
     *     -> 'DCSStore' {DecisiveCriteriaSetStore}: - {DecisiveCriteriaSet}: - 'provider' = provider
     *                                                                        - 'criteria': - criterion
     *                                                                                      - {Criterion}:
     *                                                                                              - 'album' = 'albumA'
     *                                               - {DecisiveCriteriaSet}: - 'provider' = provider
     *                                                                        - 'criteria': - criterion
     *                                                                                      - {Criterion}:
     *                                                                                              - 'album' = 'albumB'
     *                                               - {DecisiveCriteriaSet}: - 'provider' = provider
     *                                                                        - 'criteria': - {Criterion}:
     *                                                                                           - 'artist" = 'Jane Doe'
     * 'emptyCriteriaSet' {CriteriaSet}
     * 'withoutResultsCriteriaSet' {CriteriaSet}: - 'criteria': - 'artist' = 'Jean-Michel'
     * 'criteriaSet' -> 'criteria': - criterion
     */
    describe('CriteriaSet research functions', function () {
      before(function () {
        const provider = new Provider({
          key: 0,
          typeMappers: [
            () => null,
            () => null
          ]
        })
        DIC.get('ConfigurationStore').set('providers', [provider])

        const DCSStore = new DecisiveCriteriaSetStore()
        DIC.set('DCSStore', DCSStore)

        const dcsA = new DecisiveCriteriaSet({
          provider,
          id: ''
        })
        dcsA.add(this.criterion)
        dcsA.add(new Criterion('album', 'album1'))
        const dcsB = new DecisiveCriteriaSet({
          provider,
          id: ''
        })
        dcsB.add(this.criterion)
        dcsB.add(new Criterion('album', 'album1'))
        const dcsC = new DecisiveCriteriaSet({
          provider,
          id: ''
        })
        dcsC.add(new Criterion('artist', 'Jane Doe'))
        dcsC.add(new Criterion('album', 'album2'))

        DCSStore.add(dcsA)
        DCSStore.add(dcsB)
        DCSStore.add(dcsC)

        this.emptyCriteriaSet = new CriteriaSet()
        this.withoutResultsCriteriaSet = new CriteriaSet()
        this.withoutResultsCriteriaSet.add(new Criterion('artist', 'Jean-Michel'))
        this.criteriaSet.add(this.criterion)
      })

      /**
       * Test la resolution des ensembles de criteres determinants correspondants.
       */
      it('should resolve corresponding DecisiveCriteriaSets', function () {
        expect(this.emptyCriteriaSet.resolveDecisiveCriteriaSets(),
          'There should be the 3 registered DCSs since this is an empty criteriaSet.')
        .to.have.lengthOf(3)
        expect(this.withoutResultsCriteriaSet.resolveDecisiveCriteriaSets(),
          'There should be 0 DCS since this criteriaSet don\'t correspond to any registered DCS.')
        .to.have.lengthOf(0)

        const criteriaSetResult = this.criteriaSet.resolveDecisiveCriteriaSets()
        expect(criteriaSetResult,
          'There should be 2 DCSs since this criteriaSet contains this.criterion, as 2 DCSs.')
        .to.have.lengthOf(2)
        expect(criteriaSetResult[0].criteria.artist).to.equal(this.criterion)
      })

      /**
       * Test la resolution des valeurs possibles pour un type de critere.
       */
      it('should resolve the possible CriterionTypes', function () {
        expect(this.emptyCriteriaSet.resolveCriteriaByType(this.criterion.type),
          'There should be the 2 used artists since this is an empty criteriaSet')
        .to.have.lengthOf(2)
        expect(this.withoutResultsCriteriaSet.resolveCriteriaByType(this.criterion.type)).to.have.lengthOf(0)
        expect(this.criteriaSet.resolveCriteriaByType(this.criterion.type),
          'There should be only one possibility since the type is already in the criteriaSet.')
        .to.have.lengthOf(1)

        expect(() => {
          this.criteriaSet.resolveCriteriaByType('invalid type')
        }).to.throw(TypeError)

        expect(this.emptyCriteriaSet.resolveCriteriaByType('album'),
          'There should be the 2 used albums since this is an empty criteriaSet')
        .to.have.lengthOf(2)
        expect(this.withoutResultsCriteriaSet.resolveCriteriaByType('album')).to.have.lengthOf(0)
        const criteriaSetResult = this.criteriaSet.resolveCriteriaByType('album')
        expect(criteriaSetResult).to.have.lengthOf(1)
        expect(criteriaSetResult[0].criteria).to.have.ownProperty(this.criterion.type)
        expect(criteriaSetResult[0].criteria[this.criterion.type].value).to.equal(this.criterion.value)
        expect(criteriaSetResult[0].criteria).to.have.ownProperty('album')
        expect(criteriaSetResult[0].criteria.album.value).to.equal('album1')
      })

      after(function () {
        DIC.remove('DCSStore')
        delete this.emptyCriteriaSet
        delete this.withoutResultsCriteriaSet
        this.criteriaSet.remove(this.criterion.type)

        DIC.get('ConfigurationStore').remove('providers')
      })
    })

    after(function () {
      delete this.criterion
      delete this.criteriaSet
    })
  })

  after(function () {
    DIC.remove('ConfigurationStore')
  })
})
