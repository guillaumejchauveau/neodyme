/**
 * @file Tests de la classe Store.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import { expect } from 'chai'

/**
 * Classe Store.
 * @type {Store}
 */
import Store from '../../src/main/Store/index'
/**
 * Classe DecisiveCriteriaSetStore.
 * @type {Store}
 */
import DecisiveCriteriaSetStore from '../../src/main/Store/DecisiveCriteriaSetStore/index'
/**
 * Classe DecisiveCriteriaSet.
 * @type {DecisiveCriteriaSet}
 */
import DecisiveCriteriaSet from '../../src/main/Criterion/CriteriaSet/DecisiveCriteriaSet/index'

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
  })

  /**
   * Test la creation d'un Store.
   */
  it('should create a Store', function () {
    this.store = new Store()
    expect(this.store).to.be.an.instanceof(Store)
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

  describe('DecisiveCriteriaSetStore', function () {
    before(function () {
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
      expect(() => { this.DCSStore.add(new DecisiveCriteriaSet({provider: '', id: ''})) }).to.not.throw(TypeError)
      expect(this.DCSStore.store).to.have.lengthOf(1)
      expect(this.DCSStore.add(new DecisiveCriteriaSet({provider: '', id: ''}))).to.equal(1)

      expect(() => { this.DCSStore.add({wrong: 'object'}) }).to.throw(TypeError)
      expect(this.DCSStore.store).to.have.lengthOf(2)
    })

    after(function () {
      delete this.DCSStore
    })
  })

  after(function () {
    this.store.remove('dataObject')
  })
})
