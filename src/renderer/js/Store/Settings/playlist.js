/**
 * @file Parametres de la partie Liste de lecture.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

const playlist = {
    controlPanel: {
        size: 130
    },
    tracksList  : {
        close           : {
            height: 45
        },
        waypointScroller: {
            height         : 45,
            defaultMaxAngle: Math.PI / 2.5
        },
        item            : {
            height: 35
        }
    }
}

playlist.tracksList.size                           = playlist.controlPanel.size * 3
playlist.tracksList.close.angularHeight            = Math.asin((playlist.tracksList.close.height / 2)
                                                               / playlist.tracksList.size) * 2
playlist.tracksList.waypointScroller.angularHeight = Math.asin((playlist.tracksList.waypointScroller.height / 2)
                                                               / playlist.tracksList.size) * 2
playlist.tracksList.item.angularHeight             = Math.asin((playlist.tracksList.item.height / 2)
                                                               / playlist.tracksList.size) * 2

export default playlist
