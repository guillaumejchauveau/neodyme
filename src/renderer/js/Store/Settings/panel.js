/**
 * @file Parametres de la partie Panel.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

/**
 * Classe PanelConfig.
 * @type {PanelConfig}
 */
import PanelConfig from '../../PanelConfig'
/**
 * Classe CriteriaSet.
 * @type {CriteriaSet}
 */
import CriteriaSet from '../../Criterion/CriteriaSet'

export default {
  /**
   * La hierarchie de navigation dans les type de critere des configurations des panels.
   * @type {Array<Number>}
   */
  panelFlow: [0, 1, 2],

  /**
   * Les differents panel presets.
   * @type {Object}
   */
  panelPresets: {
    /**
     * Le preset 'Tout les artistes'.
     * @type {PanelConfig}
     */
    allArtists: new PanelConfig(new CriteriaSet(), 'artist', 'Tout les artistes', 'artist'),
    /**
     * Le preset 'Tout les albums'.
     * @type {PanelConfig}
     */
    allAlbums: new PanelConfig(new CriteriaSet(), 'album', 'Tout les albums', 'album'),
    /**
     * Le preset 'Tout les titres'.
     * @type {PanelConfig}
     */
    allTitles: new PanelConfig(new CriteriaSet(), 'title', 'Tout les titres', 'title')
  },

  /**
   * Le nom du panel preset initial.
   * @type {String}
   */
  initialPanel: 'allAlbums',

  /**
   * Les differents ordres de priorite des types de criteres de tri.
   * @type {Object}
   */
  sortCriterionTypeOrders: {
    /**
     * Ordre de priorite des type de criteres de tri, quand le type de criteres de tri actif est 'artiste'.
     * @type {Array<String>}
     */
    artist: ['artist', 'album', 'trackNumber'],
    /**
     * Ordre de priorite des type de criteres de tri, quand le type de criteres de tri actif est 'album'.
     * @type {Array<String>}
     */
    album: ['album', 'trackNumber'],
    /**
     * Ordre de priorite des type de criteres de tri, quand le type de criteres de tri actif est 'titre'.
     * @type {Array<String>}
     */
    title: ['title', 'album', 'artist'],
    /**
     * Ordre de priorite des type de criteres de tri, quand le type de criteres de tri actif est 'numero de piste'.
     * @type {Array<String>}
     */
    trackNumber: ['trackNumber', 'title', 'album', 'artist'],
    /**
     * Ordre de priorite des type de criteres de tri, quand le type de criteres de tri actif est 'duree'.
     * @type {Array<String>}
     */
    duration: ['duration', 'trackNumber', 'title']
  }
}
