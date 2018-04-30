import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { VisualizationState } from '../../store/reducers';
import { Observable } from 'rxjs/Observable';
import { Visualization } from '../../models/visualization.model';
import { getVisualizationObjectById } from '../../store/selectors/visualization-object.selectors';
import { InitializeVisualizationObjectAction } from '../../store/actions/visualization-object.actions';

@Component({
  selector: 'app-visualization-card',
  templateUrl: 'visualization-card.html',
})
export class VisualizationCard implements OnInit{

  @Input() id: string;
  visualizationObject$: Observable<Visualization>;
  constructor(private store: Store<VisualizationState>) {

  }

  ngOnInit() {
    this.visualizationObject$ = this.store.select(getVisualizationObjectById(this.id));
    this.store.dispatch(new InitializeVisualizationObjectAction(this.id))
  }

}
