import { HttpClientService } from '../../../app/services/http-client.service';
import { Injectable } from '@angular/core';
import { VisualizationDataSelection } from '../models/visualization-data-selection.model';
import { getAnalyticsUrl } from '../helpers';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AnalyticsService {
  constructor(private http: HttpClientService) {
  }

  getAnalytics(dataSelections: VisualizationDataSelection[], isAggregate: boolean, config?: any) {
    const analyticsUrl = getAnalyticsUrl(dataSelections, isAggregate);
    return analyticsUrl !== '' ? this.http.get(analyticsUrl) : of(null);

  }
}
