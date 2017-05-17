/**
 * @file Tests de la classe Store.
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
 * 'dataString' {String}
 * 'dataObject' {Object}
 * 'store' {Store}
 */
describe('Store', function () {
  before(function () {
    this.dataString = 'hello world'
    this.dataObject = {
      anArray: [
        0,
        {
          title: 'hello'
        },
        'hello'
      ],
      name: 'John Doe',
      age: 42
    }
    this.store = new Store()
  })

  /**
   * Test si le Store enregistre une donnee.
   */
  it('should store data', function () {
    this.store.set('dataString', this.dataString)
    this.store.set('dataObject', this.dataObject)

    expect(this.store.store).to.have.ownProperty('dataString')
    expect(this.store.store).to.have.ownProperty('dataObject')
    expect(this.store.store.dataString).to.equal(this.dataString)
    expect(this.store.store.dataObject).to.deep.equal(this.dataObject)
  })

  /**
   * Test si le Store recupere une donnee.
   */
  it('should retrieve data', function () {
    expect(this.store.get('dataString')).to.equal(this.dataString)
    expect(this.store.get('dataObject')).to.deep.equal(this.dataObject)
  })

  /**
   * Test si le Store supprime une donnee.
   */
  it('should remove data', function () {
    this.store.remove('dataString')

    expect(this.store.store).to.not.have.property('dataString')
    expect(this.store.store).to.have.property('dataObject')
  })

  /**
   * 'provider' {Provider}: - 'key' = 0
   * 'DIC' -> 'ConfigurationStore' {Store} -> 'criterion' -> 'types': - 'artist'
   *                                       -> 'providers': - provider
   * 'DCSStore' {DecisiveCriteriaSetStore}
   */
  describe('DecisiveCriteriaSetStore', function () {
    before(function () {
      const config = new Store()
      DIC.set('ConfigurationStore', config)

      // Types de criteres pris en charge.
      config.set('criterion', {
        types: [
          'artist'
        ]
      })

      this.provider = new Provider({
        key: 0,
        typeMappers: [
          () => null
        ]
      })
      config.set('providers', [this.provider])

      this.DCSStore = new DecisiveCriteriaSetStore()
    })

    /**
     * Test si le stockeur d'ensembles de criteres determinants utilise un tableau.
     */
    it('should have a store array', function () {
      expect(this.DCSStore.store).to.be.an('Array')
    })

    /**
     * Test l'ajout d'un DCS.
     */
    it('should add a DCS', function () {
      expect(() => {
        this.DCSStore.add(new DecisiveCriteriaSet({
          provider: this.provider,
          id: ''
        }))
      }).to.not.throw(TypeError)
      expect(this.DCSStore.store).to.have.lengthOf(1)
      expect(this.DCSStore.add(new DecisiveCriteriaSet({
        provider: this.provider,
        id: ''
      }))).to.equal(1)

      expect(() => {
        this.DCSStore.add({
          wrong: 'object'
        })
      }).to.throw(TypeError)
      expect(this.DCSStore.store).to.have.lengthOf(2)
    })

    after(function () {
      delete this.DCSStore
      delete this.provider
      DIC.remove('ConfigurationStore')
    })
  })

  after(function () {
    delete this.store
    delete this.dataObject
    delete this.dataString
  })
})
