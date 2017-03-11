
const ViewHistory = {
  history: [],

  addViewConfig: function (ViewConfig) {
    return ViewHistory.history.push(ViewConfig)
  },

  removeLastViewConfig: function () {
    if (ViewHistory.checkEmptyHistory()) {
      throw `ViewHistory is empty`
    }

    return ViewHistory.history.pop()
  },

  clearHistory: function () {
    ViewHistory.history = []
  },

  getLastViewConfig: function () {
    if (ViewHistory.checkEmptyHistory()) {
      throw `ViewHistory is empty`
    }

    return ViewHistory.history[ ViewHistory.history.length - 1 ]
  },

  checkEmptyHistory: function () {
    return ViewHistory.history == []
  },

}

module.exports = ViewHistory
