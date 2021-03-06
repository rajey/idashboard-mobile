import { Analytics } from './analytics.model';
import { VisualizationDataSelection } from './visualization-data-selection.model';

export interface VisualizationLayer {
  id: string;
  analytics: Analytics;
  dataSelections?: VisualizationDataSelection[];
  layerType?: string;
  config?: {[name: string]: any};
}
