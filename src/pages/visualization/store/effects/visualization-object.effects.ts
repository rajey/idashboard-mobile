import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as _ from 'lodash';
import {
  InitializeVisualizationObjectAction, LoadVisualizationFavoriteAction, LoadVisualizationFavoriteFailAction,
  LoadVisualizationFavoriteSuccessAction,
  UpdateVisualizationObjectAction,
  VisualizationObjectActionTypes
} from '../actions/visualization-object.actions';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { VisualizationState, getVisualizationObjectEntities } from '../reducers';
import { Visualization } from '../../models/visualization.model';
import { FavoriteService } from '../../services/favorite.service';
import { of } from 'rxjs/observable/of';
import { getSelectionDimensionsFromFavorite } from '../../helpers/get-selectiion-dimensions-from-favorite.helper';
import { AddVisualizationLayerAction } from '../actions/visualization-layer.actions';
import { VisualizationLayer } from '../../models/visualization-layer.model';

@Injectable()
export class VisualizationObjectEffects {
  constructor(private actions$: Actions, private store: Store<VisualizationState>,
    private favoriteService: FavoriteService) {
  }

  @Effect({dispatch: false}) initializeVisualizationObject$ = this.actions$.ofType(
    VisualizationObjectActionTypes.INITIALIZE_VISUALIZATION_OBJECT).
    pipe(withLatestFrom(this.store.select(getVisualizationObjectEntities)), tap(
      ([action, visualizationObjectEntities]: [InitializeVisualizationObjectAction, {[id: string]: Visualization}]) => {
        const visualizationObject: Visualization = visualizationObjectEntities[action.id];

        if (visualizationObject && !visualizationObject.progress) {
          // Set initial Progress
          this.store.dispatch(new UpdateVisualizationObjectAction(visualizationObject.id, {
            progress: {
              statusCode: 200,
              statusText: 'OK',
              percent: 0,
              message: 'Loading favorite information'
            }
          }));

          //Load favorite information
          if (visualizationObject.favorite && visualizationObject.uiConfig && visualizationObject.uiConfig.showBody) {
            this.store.dispatch(
              new LoadVisualizationFavoriteAction(visualizationObject.id, visualizationObject.favorite));
          }
        }
      }));

  @Effect() loadFavorite$ = this.actions$.ofType(VisualizationObjectActionTypes.LOAD_VISUALIZATION_FAVORITE).pipe(
    mergeMap((action: LoadVisualizationFavoriteAction) => this.favoriteService.getFavorite(action.favorite).
      pipe(map((favorite: any) => new LoadVisualizationFavoriteSuccessAction(action.id, favorite)),
        catchError((error) => of(new LoadVisualizationFavoriteFailAction(action.id, error))))));

  @Effect({dispatch: false}) loadFavoriteSuccess$ = this.actions$.ofType(
    VisualizationObjectActionTypes.LOAD_VISUALIZATION_FAVORITE_SUCCESS).
    pipe(tap((action: LoadVisualizationFavoriteSuccessAction) => {

      if (action.favorite) {
        const visualizationLayers: VisualizationLayer[] = _.map(action.favorite.mapViews || [action.favorite],
          (favoriteLayer: any) => {
            return {
              id: favoriteLayer.id,
              dataSelections: getSelectionDimensionsFromFavorite(favoriteLayer),
              layerType: favoriteLayer.layer || 'THEMATIC',
              analytics: null,
              config: _.omit(favoriteLayer, ['rows', 'columns', 'filters'])
            };
          });

        // Add visualization Layers
        _.each(visualizationLayers, visualizationLayer => {
          this.store.dispatch(new AddVisualizationLayerAction(visualizationLayer));
        });

        // Update visualization object
        this.store.dispatch(new UpdateVisualizationObjectAction(action.id, {
          layers: _.map(visualizationLayers, visualizationLayer => visualizationLayer.id),
          progress: {
            statusCode: 200,
            statusText: 'OK',
            percent: 50,
            message: 'Favorite information has been loaded'
          }
        }));
      }
    }));
}