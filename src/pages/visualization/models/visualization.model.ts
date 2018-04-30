import { VisualizationUiConfig } from './visualization-ui-config.model';
import { VisualizationFavorite } from './visualization-favorite.model';
import { VisualizationDataSelection } from './visualization-data-selection.model';
import { VisualizationProgress } from './visualization-progress.model';

export interface Visualization {
  id: string;
  name: string;
  type: string;
  favorite?: VisualizationFavorite;
  created?: string;
  lastUpdated?: string;
  shape: string;
  description?: string;
  uiConfig: VisualizationUiConfig;
  dataSelection?: VisualizationDataSelection;
  progress?: VisualizationProgress;
  layers: Array<string>
}
