/**
 * @file Tests des Provider.
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
import Store from '../../src/main/Store/index'
/**
 * Classe DecisiveCriteriaSetStore.
 * @type {Store}
 */
import DecisiveCriteriaSetStore from '../../src/main/Store/DecisiveCriteriaSetStore/index'
/**
 * Classe Provider.
 * @type {Object}
 */
import Provider from '../../src/main/Provider'
/**
 * Classe DecisiveCriteriaSet.
 * @type {DecisiveCriteriaSet}
 */
import DecisiveCriteriaSet from '../../src/main/Criterion/CriteriaSet/DecisiveCriteriaSet'

/**
 * 'DIC' -> 'ConfigurationStore' {Store} -> 'criterion' -> 'types': - 'artist'
 *       -> 'DCSStore' {DecisiveCriteriaSetStore}
 */
describe('Provider', function () {
  before(function () {
    const config = new Store()
    DIC.set('ConfigurationStore', config)

    // Types de criteres pris en charge.
    config.set('criterion', {
      types: [
        'artist'
      ]
    })

    const DCSStore = new DecisiveCriteriaSetStore()
    DIC.set('DCSStore', DCSStore)
  })

  /**
   * Test la verification des parametres.
   */
  it('should create provider with valid parameters', function () {
    expect(() => {
      // eslint-disable-next-line
      new Provider({
        key: 0,
        typeMappers: [
          () => null
        ]
      })
    }).to.not.throw(TypeError)

    expect(() => {
      // eslint-disable-next-line
      new Provider('wrong type')
    }).to.throw(TypeError)
    expect(() => {
      // eslint-disable-next-line
      new Provider({
        missing: 'key',
        typeMappers: [
          () => null
        ]
      })
    }).to.throw(TypeError)
    expect(() => {
      // eslint-disable-next-line
      new Provider({
        key: 'wrong type',
        typeMappers: [
          () => null
        ]
      })
    }).to.throw(TypeError)

    expect(() => {
      // eslint-disable-next-line
      new Provider({
        key: 0,
        typeMappers: {}
      })
    }, 'TypesMap should be an Array').to.throw(TypeError)
    expect(() => {
      // eslint-disable-next-line
      new Provider({
        key: 0,
        typeMappers: []
      })
    }, 'TypeMappers should contain as much typeMapper as there is criterionTypes').to.throw(Error)
  })

  /**
   * Test l'enregistrement d'une piste.
   */
  it('should save track', function () {
    expect(() => {
      Provider.saveTrack(
        new Provider({
          key: 0,
          typeMappers: [
            metadatas => metadatas.artist
          ]
        }),
        '',
        {
          artist: 'John Doe'
        })
    }).to.not.throw(TypeError)
    expect(DIC.get('DCSStore').store).to.have.lengthOf(1)
    const dcs = DIC.get('DCSStore').store[0]
    expect(dcs).to.be.instanceof(DecisiveCriteriaSet)
    expect(dcs.criteria).to.have.ownProperty('artist')
    expect(dcs.criteria.artist.value).to.equal('John Doe')

    expect(() => {
      Provider.saveTrack(
        {wrong: 'type'},
        '',
        {
          artist: 'John Doe'
        })
    }).to.throw(TypeError)
  })

  /**
   * Test si les methodes abstraites lancent des exceptions.
   */
  it('should throw Error on unimplemented methods', function () {
    const provider = new Provider({
      key: 0,
      typeMappers: [
        () => null
      ]
    })

    expect(provider.makeTracksList).to.throw(Error, 'Not implemented')
    expect(provider.getDataBuffer).to.throw(Error, 'Not implemented')
  })

  after(function () {
    DIC.remove('ConfigurationStore')
    DIC.remove('DCSStore')
  })
})
