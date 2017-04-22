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
 * Gestionnaire de requetes IPC.
 * @type {Object}
 */
import IPCHandler from './IPCHandler'
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
DIC['DCSStore'] = new DecisiveCriteriaSetStore() // Cree le stockeur d'ensembles de criteres determinants.

// Cree la configuration.
const config              = new Store()
DIC['ConfigurationStore'] = config

// Types de criteres pris en charge.
config.store.criterion = {
    types: [
        'artist',
        'album',
        'title',
        'trackNumber',
        'duration'
    ]
}

// Sources prises en chargent.
config.store.providers = [
    new FileSystemProvider({
                               key     : 0,
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
    IPCHandler.setEventListeners() // Met en place les ecouteurs d'evenements IPC.

    // Cree la fenetre.
    appWindow = new electron.BrowserWindow()
    appWindow.loadURL(/*RENDERER-URL-LOAD*/)

    // Detruit la fenetre a sa fermeture.
    appWindow.on('closed', () => {
        appWindow = null
    })
})

// Quitte quand toutes les fenetres sont fermees.
electron.app.on('window-all-closed', () => {
    electron.app.quit()
})
