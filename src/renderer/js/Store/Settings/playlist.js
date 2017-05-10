/**
 * @file Parametres de la Liste de lecture.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

const playlist = {
  controlPanel: {
    /**
     * La taille du panneau de commande (en pixels).
     * @type {Number}
     */
    size: 130
  },
  tracksList: {
    /**
     * La taille de la liste des pistes (en pixels).
     * @type {Number}
     */
    size: null,
    close: {
      /**
       * La hauteur du bouton de fermeture de la liste des pistes (en pixels).
       * @type {Number}
       */
      height: 45,
      /**
       * La hauteur angulaire du bouton de fermeture de la liste des pistes (en radians).
       * @type {Number}
       */
      angularHeight: null
    },
    waypointScroller: {
      /**
       * La hauteur du chariot de defilement de la liste des pistes (en pixels).
       * @type {Number}
       */
      height: 45,
      /**
       * La hauteur angulaire du chariot de defilement de la liste des pistes (en radians).
       * @type {Number}
       */
      angularHeight: null,
      /**
       * L'angle par defaut au defilement maximum du chariot de defilement de la liste des pistes (en radians).
       * @type {Number}
       */
      defaultMaxAngle: Math.PI / 2.5
    },
    item: {
      /**
       * La hauteur d'un element de la liste des pistes (en pixels).
       * @type {Number}
       */
      height: 35,
      /**
       * La hauteur angulaire d'un element de la liste des pistes (en radians).
       * @type {Number}
       */
      angularHeight: null
    }
  }
}

playlist.tracksList.size = playlist.controlPanel.size * 3
playlist.tracksList.close.angularHeight =
  Math.asin((playlist.tracksList.close.height / 2) / playlist.tracksList.size) * 2
playlist.tracksList.waypointScroller.angularHeight =
  Math.asin((playlist.tracksList.waypointScroller.height / 2) / playlist.tracksList.size) * 2
playlist.tracksList.item.angularHeight =
  Math.asin((playlist.tracksList.item.height / 2) / playlist.controlPanel.size) * 2

export default playlist
