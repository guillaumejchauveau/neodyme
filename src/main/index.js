const electron                 = require('electron')
const DIC                      = require('./DIC')
const ConfigurationStore       = require('./Store/ConfigurationStore')
const DecisiveCriteriaSetStore = require('./Store/DecisiveCriteriaSetStore')
const FileSystemProvider       = require('./Provider/FileSystemProvider')

/*
 * BOOTSTRAP
 */
DIC.set('DCSStore', new DecisiveCriteriaSetStore)

const config = new ConfigurationStore

DIC.set('ConfigurationStore', config)

config.store.criterion = {
    types: [
        'artist',
        'album',
        'title',
        'trackNumber',
        'duration'
    ]
}

config.store.providers = [
    new FileSystemProvider({
        dir     : `${__dirname}/music`,
        exts    : 'mp3|ogg|flac',
        duration: true,
        typesMap: [
            metadata => metadata.albumartist[0],
            metadata => metadata.album,
            metadata => metadata.title,
            metadata => metadata.track.no,
            metadata => metadata.duration
        ]
    })
]

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
