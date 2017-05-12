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
import DIC from './DependencyInjectionContainer'
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
 * INITIALISATION.
 */
// Cree le stockeur d'ensembles de criteres determinants.
DIC.set('DCSStore', new DecisiveCriteriaSetStore())

// Cree la configuration.
const config = new Store()
DIC.set('ConfigurationStore', config)

// Types de criteres pris en charge.
config.set('criterion', {
  types: [
    'artist',
    'album',
    'title',
    'trackNumber',
    'duration'
  ]
})

// Sources prises en charge.
config.set('providers', [
  new FileSystemProvider({
    key: 0,
    dir: `${__dirname}/music`,
    exts: 'mp3|ogg|flac',
    duration: true,
    typeMappers: [
      metadatas => metadatas.albumartist[0] || 'Artiste inconnu',
      metadatas => metadatas.album || 'Album inconnu',
      metadatas => metadatas.title,
      metadatas => metadatas.track.no,
      metadatas => metadatas.duration
    ]
  })
])

/*
 * GESTION DES FENETRES.
 */
let appWindow

electron.app.on('ready', () => {
  // eslint-disable-next-line
  /*INJECT-DEVTOOLS-INSTALLER*/

  // Met en place les ecouteurs d'evenements IPC.
  IPCHandler.setEventListeners()

  // Cree la fenetre.
  appWindow = new electron.BrowserWindow({
    width: 1100,
    height: 700,
    minWidth: 1100,
    minHeight: 700
  })
  appWindow.loadURL(/*INJECT-RENDERER-URL*/)

  // Detruit la fenetre a sa fermeture.
  appWindow.on('closed', () => {
    appWindow = null
  })
})

// Quitte quand toutes les fenetres sont fermees.
electron.app.on('window-all-closed', () => {
  electron.app.quit()
})
