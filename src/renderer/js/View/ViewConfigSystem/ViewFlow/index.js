
const ViewFlow = {
  flowStates:  ['artist',
                'album',
                'track'],

  getIndex: function (state) {
    return ViewFlow.flowStates.indexOf(state)
  },

  getNextState: function (currentState) {
    if (ViewFlow.checkLowestState(currentState)) {
      throw  `ViewFlow : there is no next state for ${currentState}`
    }
    return ViewFlow.flowStates[ViewFlow.getIndex(currentState) + 1]
  },

  getPreviousState: function (currentState) {
    if (ViewFlow.checkHighestState(currentState)) {
      throw  `ViewFlow : there is no previous state for ${currentState}`
    }
    return ViewFlow.flowStates[ViewFlow.getIndex(currentState) - 1]
  },

  checkStateExist: function (state) {
    return (ViewFlow.flowStates.indexOf(state) == -1)
  },

  checkLowestState: function (state) {
    if (ViewFlow.checkStateExist(state)) {
      throw `ViewFlow : state ${state} doesn't exist`
    }

    return (state == ViewFlow.flowStates[ViewFlow.flowStates.lenght - 1])
  },

  checkHighestState: function (state) {
    if (ViewFlow.checkStateExist(state)) {
      throw `ViewFlow : state ${state} doesn't exist`
    }

    return (state == ViewFlow.flowStates[0])
  }
}

module.exports = ViewFlow
