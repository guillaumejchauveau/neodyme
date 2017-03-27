/**
 * @file Point d'entree de l'application.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import electron from 'electron'

/**
 * Conteneur d'injection de dependances.
 * @type {Object}
 */
import DIC from './DIC'
/**
 * Classe Store.
 * @type {Store}
 */
import Store from './Store'
/**
 * Classe DecisiveCriteriaSetStore.
 * @type {DecisiveCriteriaSetStore}
 */
import DecisiveCriteriaSetStore from './Store/DecisiveCriteriaSetStore'
/**
 * Classe FileSystemProvider.
 * @type {FileSystemProvider}
 */
import FileSystemProvider from './Provider/FileSystemProvider'

/*
 * BOOTSTRAP
 */
DIC['DCSStore'] = new DecisiveCriteriaSetStore()

const config              = new Store
DIC['ConfigurationStore'] = config

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
    appWindow = new electron.BrowserWindow()
    appWindow.loadURL(/*RENDERER-URL-LOAD*/)
    
    appWindow.on('closed', () => {
        appWindow = null
    })
})

electron.app.on('window-all-closed', () => {
    electron.app.quit()
})
