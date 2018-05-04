import { Action } from '@ngrx/store';
import { VisualizationUiConfig } from '../../models/visualization-ui-config.model';

export enum VisualizationUiConfigurationActionTypes {
  ADD_ALL_VISUALIZATION_UI_CONFIGURATIONS = '[VisualizationUIConfig] Add all visualization Ui configurations',
}

export class AddAllVisualizationUiConfigurationsAction implements Action {
  readonly type = VisualizationUiConfigurationActionTypes.ADD_ALL_VISUALIZATION_UI_CONFIGURATIONS;
  constructor(public visualizationUiConfigurations: VisualizationUiConfig[]) {}
}

export type VisualizationUiConfigurationAction = AddAllVisualizationUiConfigurationsAction;
