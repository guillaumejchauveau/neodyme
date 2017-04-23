import PanelConfig from '../../Panel/PanelConfig'
import CriteriaSet from '../../Criterion/CriteriaSet'

export default {
    panelFlow: [0, 1, 2],
    panelPresets: {
      allArtists: new PanelConfig(new CriteriaSet(), 'artist'),
      allAlbums: new PanelConfig(new CriteriaSet(), 'album'),
      allTitles: new PanelConfig(new CriteriaSet(), 'title'),
    },
    initialPanel: 'allArtists'
}
