import { Action } from '@ngrx/store';
import { VisualizationConfig } from '../../models/visualization-config.model';

export enum VisualizationConfigurationActionTypes {
  ADD_VISUALIZATION_CONFIGURATION = '[VisualizationConfig] Add visualization configuration',
}

export class AddVisualizationConfigurationAction implements Action {
  readonly type = VisualizationConfigurationActionTypes.ADD_VISUALIZATION_CONFIGURATION;
  constructor(public visualizationConfiguration: VisualizationConfig) {}
}

export type VisualizationConfigurationAction = AddVisualizationConfigurationAction;
