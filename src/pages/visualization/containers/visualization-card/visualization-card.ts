import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { VisualizationState } from '../../store/reducers';
import { Observable } from 'rxjs/Observable';
import { Visualization } from '../../models/visualization.model';
import {
  getCurrentVisualizationProgress,
  getVisualizationObjectById
} from '../../store/selectors/visualization-object.selectors';
import { InitializeVisualizationObjectAction } from '../../store/actions/visualization-object.actions';
import { VisualizationLayer } from '../../models/visualization-layer.model';
import { VisualizationUiConfig } from '../../models/visualization-ui-config.model';
import { getCurrentVisualizationObjectLayers } from '../../store/selectors/visualization-layer.selectors';
import { getCurrentVisualizationUiConfig } from '../../store/selectors/visualization-ui-configuration.selectors';
import { Subject } from 'rxjs/Subject';
import { filter } from 'rxjs/operators';
import { VisualizationInputs } from '../../models/visualization-inputs.model';
import { VisualizationProgress } from '../../models/visualization-progress.model';
import { VisualizationConfig } from '../../models/visualization-config.model';
import { getCurrentVisualizationConfig } from '../../store/selectors/visualization-configuration.selectors';

@Component({
  selector: 'app-visualization-card',
  templateUrl: 'visualization-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisualizationCard implements OnInit, OnChanges, AfterViewInit {

  @Input() id: string;
  @Input() type: string;
  @Input() visualizationLayers: VisualizationLayer[];
  private _visualizationInputs$: Subject<VisualizationInputs> = new Subject();
  visualizationObject$: Observable<Visualization>;
  visualizationLayers$: Observable<VisualizationLayer[]>;
  visualizationUiConfiguration$: Observable<VisualizationUiConfig>;
  visualizationProgress$: Observable<VisualizationProgress>;
  visualizationConfig$: Observable<VisualizationConfig>;

  constructor(private store: Store<VisualizationState>) {
    this._visualizationInputs$.asObservable().
      subscribe((visualizationInputs) => {
        if (visualizationInputs) {
          // initialize visualization object
          this.store.dispatch(new InitializeVisualizationObjectAction(visualizationInputs.id));
          // Get selectors
          this.visualizationObject$ = this.store.select(getVisualizationObjectById(visualizationInputs.id));
          this.visualizationLayers$ = this.store.select(getCurrentVisualizationObjectLayers(visualizationInputs.id));
          this.visualizationUiConfiguration$ =
            this.store.select(getCurrentVisualizationUiConfig(visualizationInputs.id));
          this.visualizationProgress$ = this.store.select(getCurrentVisualizationProgress(visualizationInputs.id));
          this.visualizationConfig$ = this.store.select(getCurrentVisualizationConfig(visualizationInputs.id));
        }
      });
  }

  ngOnChanges() {
    this._visualizationInputs$.next({id: this.id, type: this.type, visualizationLayers: this.visualizationLayers});
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

}
