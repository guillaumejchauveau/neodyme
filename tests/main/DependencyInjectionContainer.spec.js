/**
 * @file Tests du conteneur d'injection de dependances.
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

describe('Dependency Injection Container', function () {
  /**
   * Test si le DIC est un Store.
   */
  it('should be a Store', function () {
    expect(DIC).to.be.an.instanceof(Store)
  })
})
