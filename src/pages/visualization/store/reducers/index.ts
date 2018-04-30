import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import {
  visualizationObjectAdapter, visualizationObjectReducer,
  VisualizationObjectState
} from './visualization-object.reducer';
import {
  visualizationLayerAdapter, visualizationLayerReducer,
  VisualizationLayerState
} from './visualization-layer.reducer';

export interface VisualizationState {
visualizationObject: VisualizationObjectState,
  visualizationLayer:VisualizationLayerState
}

export const reducers: ActionReducerMap<VisualizationState> = {
  visualizationObject: visualizationObjectReducer,
  visualizationLayer: visualizationLayerReducer
}

export const getVisualizationState = createFeatureSelector<VisualizationState>('visualization');

// General selector for visualization object
export const getVisualizationObjectState = createSelector(getVisualizationState, (state: VisualizationState) => state.visualizationObject);

export const {
  selectEntities: getVisualizationObjectEntities,
  selectAll: getAllVisualizationObjects
} = visualizationObjectAdapter.getSelectors(getVisualizationObjectState);

// General selector for visualization layers
export const getVisualizationLayerState = createSelector(getVisualizationState, (state: VisualizationState) => state.visualizationLayer);

export const {
  selectEntities: getVisualizationLayerEntities,
  selectAll: getAllVisualizationLayers
} = visualizationLayerAdapter.getSelectors(getVisualizationLayerState);
