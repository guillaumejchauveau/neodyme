class ViewFlow {
  static viewFlow () {
    return  ['artist',
              'album',
              'track']
  }

  static getIndex (viewFlowState) {
    return this.viewFlow().indexOf(viewFlowState)
  }

  static checkState (viewFlowState) {
    if (this.viewFlow().indexOf(viewFlowState) == -1) {
      throw `Unrecognized state: ${viewFlowState}`
    }
  }

  static checkDeeperState (viewFlowState) {
    return this.viewFlow().indexOf(viewFlowState) == this.viewFlow.lenght
  }

  static checkHighterState (viewFlowState) {
    return this.viewFlow().indexOf(viewFlowState) == 0
  }

  static getNextState (viewFlowState) {
    this.checkState(viewFlowState)
    if (this.checkDeeperState(viewFlowState)) {
      throw `${viewFlowState} is the deepest state, there is no next state`
    }

    return this.viewFlow()[this.getIndex(viewFlowState) + 1]
  }

  static getPreviousState (viewFlowState) {
    this.checkState(viewFlowState)
    if (this.checkHighterState(viewFlowState)) {
      throw `${viewFlowState} is the hightest state, there is no previous state`
    }

    return this.viewFlow()[this.getIndex(viewFlowState) - 1]
  }
}


module.exports = ViewFlow
