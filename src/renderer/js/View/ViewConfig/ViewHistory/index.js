class ViewConfigHistory {
  constructor () {
    this.history = []
  }

  addViewConfig (viewConfig) {
    this.history.append({
      'criteriaSet': viewConfig.criteriaSet,
      'criteriaType': viewConfig.criteriaType
    })
  }

  removeLastViewConfig () {
    this.history.pop()
  }

  clearViewConfigHistory () {
    this.history = []
  }

  getLastViewConfig () {
    return history[history.length - 1]
  }
}

module.exports = ViewConfigHistory
