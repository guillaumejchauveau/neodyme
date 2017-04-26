/**
 * @file Parametres de la partie Panel.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

/**
* Classe PanelConfig.
* @type {PanelConfig}
*/
import PanelConfig from '../../Panel/PanelConfig'
/**
 * Classe CriteriaSet.
 * @type {CriteriaSet}
 */
import CriteriaSet from '../../Criterion/CriteriaSet'

export default {
    panelFlow: [0, 1, 2],
    panelPresets: {
      allArtists: new PanelConfig(new CriteriaSet(), 'artist', 'Tout les artistes'),
      allAlbums: new PanelConfig(new CriteriaSet(), 'album', 'Tout les albums'),
      allTitles: new PanelConfig(new CriteriaSet(), 'title', 'Tout les titres'),
    },
    initialPanel: 'allAlbums'
}
