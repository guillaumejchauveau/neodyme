const DependenciesInjectionContainer = {
    _instances: {},
    set(key, value) {
        return this._instances[key] = value
    },
    get(key) {
        return this._instances[key]
    },
    remove(key) {
        delete this._instances[key]
    }
}

module.exports = DependenciesInjectionContainer
