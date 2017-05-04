/**
 * @file Parametres de la partie Liste de lecture.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

const playlist = {
  controlPanel: {
    size: 130 // Taille du panneau de controle (en pixels).
  },
  tracksList: {
    close: {
      height: 45 // Hauteur du bouton de fermeture de la liste des pistes (en pixels).
    },
    waypointScroller: {
      height: 45, // Hauteur du chariot de defilement de la liste des pistes (en pixels).
      defaultMaxAngle: Math.PI / 2.5 // Angle par defaut au defilement maximum du chariot de defilement de la liste des
                                     // pistes (en radians).
    },
    item: {
      height: 35 // Hauteur d'un element de la liste des pistes (en pixels).
    }
  }
}

playlist.tracksList.size = playlist.controlPanel.size * 3 // Taille de la liste des pistes (en pixels).
playlist.tracksList.close.angularHeight =
  Math.asin((playlist.tracksList.close.height / 2) / playlist.tracksList.size) * 2 // Hauteur angulaire du bouton de
                                                                                   // fermeture de la liste des pistes
                                                                                   // (en radians).
playlist.tracksList.waypointScroller.angularHeight =
  Math.asin((playlist.tracksList.waypointScroller.height / 2) / playlist.tracksList.size) * 2 // Hauteur angulaire du
                                                                                              // chariot de defilement
                                                                                              // de la liste des pistes
                                                                                              // (en radians).
playlist.tracksList.item.angularHeight =
  Math.asin((playlist.tracksList.item.height / 2) / playlist.controlPanel.size) * 2 // Hauteur angulaire d'un element
                                                                                    // de la liste des pistes (en
                                                                                    // radians).

export default playlist
