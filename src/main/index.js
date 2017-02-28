const electron                 = require('electron')
const DIC                      = require('./DIC')
const ConfigurationStore       = require('./Store/ConfigurationStore')
const DecisiveCriteriaSetStore = require('./Store/DecisiveCriteriaSetStore')

/*
 * BOOTSTRAP
 */
const config = new ConfigurationStore

config.store.criterion = {
    types: [
        'album',
        'artist',
        'title',
        'duration'
    ]
}

DIC.set('ConfigurationStore', config)
DIC.set('DCSStore', new DecisiveCriteriaSetStore)

/*
 * WINDOW MANAGEMENT
 */
let appWindow

electron.app.on('ready', () => {
    //appWindow = new electron.BrowserWindow()
    //appWindow.loadURL(/*RENDERER-URL-LOAD*/)
    
    /*appWindow.on('closed', () => {
     appWindow = null
     })*/
})

electron.app.on('window-all-closed', () => {
    electron.app.quit()
})
