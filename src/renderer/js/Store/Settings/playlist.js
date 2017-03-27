/**
 * @file Parametres de la partie Liste de lecture.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

const playlist = {
    controlPanel: {
        size: 130 // Taille en pixels du panneau de controle.
    },
    tracksList  : {
        close           : {
            height: 45 // Hauteur en pixels du bouton de fermeture de la liste des pistes.
        },
        waypointScroller: {
            height         : 45, // Hauteur en pixels du chariot de defilement de la liste des pistes.
            defaultMaxAngle: Math.PI / 2.5 // Angle par defaut en radians au defilement maximum du chariot de defilement de la liste des pistes.
        },
        item            : {
            height: 35 // Hauteur en pixels d'un element de la liste des pistes.
        }
    }
}

playlist.tracksList.size                           = playlist.controlPanel.size * 3 // Taille en pixels de la liste des pistes
playlist.tracksList.close.angularHeight            = Math.asin((playlist.tracksList.close.height / 2)
                                                               / playlist.tracksList.size) * 2 // Hauteur angulaire en radians du bouton de fermeture de la liste des pistes.
playlist.tracksList.waypointScroller.angularHeight = Math.asin((playlist.tracksList.waypointScroller.height / 2)
                                                               / playlist.tracksList.size) * 2 // Hauteur angulaire en radians du chariot de defilement de la liste des pistes.
playlist.tracksList.item.angularHeight             = Math.asin((playlist.tracksList.item.height / 2)
                                                               / playlist.controlPanel.size) * 2 // Hauteur angulaire en radians d'un element de la liste des pistes.

export default playlist
