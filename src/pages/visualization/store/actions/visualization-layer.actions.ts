import { Action } from '@ngrx/store';
import { VisualizationLayer } from '../../models/visualization-layer.model';

export enum VisualizationLayerActionTypes {
  ADD_VISUALIZATION_LAYER = '[VisualizationLayer] Add visualization layer',
  LOAD_VISUALIZTION_ANALYTICS = '[VisualizationLayer] Load visualization analytics',
}

export class AddVisualizationLayerAction implements Action {
  readonly type = VisualizationLayerActionTypes.ADD_VISUALIZATION_LAYER;
  constructor(public visualizationLayer: VisualizationLayer) {}
}

export class LoadVisualizationAnalyticsAction implements Action {
  readonly type = VisualizationLayerActionTypes.LOAD_VISUALIZTION_ANALYTICS;
  constructor(public visualizationLayer: VisualizationLayer) { }
}

export type VisualizationLayerAction = AddVisualizationLayerAction| LoadVisualizationAnalyticsAction;
