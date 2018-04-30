import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { VisualizationState } from '../reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class VisualizationLayerEffects {
  constructor(private actions$: Actions, private store: Store<VisualizationState>) {}
}
