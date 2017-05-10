/**
 * @file Parametres de la partie Panel.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

/**
 * Classe PanelConfig.
 * @type {PanelConfig}
 */
import PanelConfig from '../../App/Panel/PanelConfig'
/**
 * Classe CriteriaSet.
 * @type {CriteriaSet}
 */
import CriteriaSet from '../../Criterion/CriteriaSet'

export default {
  panelFlow: [0, 1, 2],
  panelPresets: {
    allArtists: new PanelConfig(new CriteriaSet(), 'artist', 'Tout les artistes', 'artist'),
    allAlbums: new PanelConfig(new CriteriaSet(), 'album', 'Tout les albums', 'album'),
    allTitles: new PanelConfig(new CriteriaSet(), 'title', 'Tout les titres', 'title')
  },
  defaultActiveSortCriterionType: 'trackNumber',
  sortCriterionTypeOrders: {
    artist: ['artist', 'album', 'trackNumber'],
    album: ['album', 'trackNumber'],
    title: ['title', 'album', 'artist'],
    trackNumber: ['trackNumber', 'title', 'album', 'artist'],
    duration: ['duration', 'trackNumber', 'title']
  },
  initialPanel: 'allAlbums'
}
