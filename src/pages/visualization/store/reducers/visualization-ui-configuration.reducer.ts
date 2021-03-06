import { VisualizationUiConfig } from '../../models/visualization-ui-config.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  VisualizationUiConfigurationAction,
  VisualizationUiConfigurationActionTypes
} from '../actions/visualization-ui-configuration.actions';

export interface VisualizationUiConfigurationState extends EntityState<VisualizationUiConfig> {
}

export const visualizationUiConfigurationAdapter: EntityAdapter<VisualizationUiConfig> = createEntityAdapter<VisualizationUiConfig>();

const initialState: VisualizationUiConfigurationState = visualizationUiConfigurationAdapter.getInitialState({});

export function visualizationUiConfigurationReducer(state: VisualizationUiConfigurationState = initialState,
  action: VisualizationUiConfigurationAction): VisualizationUiConfigurationState {
  switch (action.type) {
    case VisualizationUiConfigurationActionTypes.ADD_ALL_VISUALIZATION_UI_CONFIGURATIONS:
      return visualizationUiConfigurationAdapter.addAll(action.visualizationUiConfigurations, state);
  }
  return state;
}
