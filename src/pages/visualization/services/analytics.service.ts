import { HttpClientService } from '../../../app/services/http-client.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AnalyticsService {
  constructor(private http: HttpClientService) {}

  getAnalytics() {

  }
}
