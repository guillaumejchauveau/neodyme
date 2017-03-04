/**
 * @file Conteneur d'injection de dependences.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

/**
 * Classe Store.
 * @type {Store}
 */
const Store = require('./Store')

const DependenciesInjectionContainer = new Store

module.exports = DependenciesInjectionContainer
