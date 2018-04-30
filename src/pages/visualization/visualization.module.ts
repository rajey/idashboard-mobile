import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';
import { containers } from './containers';
import { CommonModule } from '@angular/common';
import { services } from './services';

@NgModule({
  declarations: [
    ...containers
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('visualization', reducers),
    EffectsModule.forFeature(effects)
  ],
  exports: [
    ...containers
  ],
  providers: [...services]
})
export class VisualizationPageModule {}
