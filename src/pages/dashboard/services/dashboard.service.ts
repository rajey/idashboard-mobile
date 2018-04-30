import { Injectable } from '@angular/core';
import { Dashboard } from '../models/dashboard.model';
import { HttpClientService } from '../../../app/services/http-client.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DashboardService {
  dashboardUrlFields: string;

  constructor(private http: HttpClientService) {
    this.dashboardUrlFields = '?fields=id,name,publicAccess,access,externalAccess,created,lastUpdated,' +
      'user[id,name],dashboardItems[id,type,created,lastUpdated,shape,appKey,reports[id,displayName],chart[id,displayName],' +
      'map[id,displayName],reportTable[id,displayName],eventReport[id,displayName],eventChart[id,displayName],' +
      'resources[id,displayName],users[id,displayName]]&paging=false';
  }

  loadAll(): Observable<Dashboard[]> {
    return this.http.get(`dashboards.json${this.dashboardUrlFields}`).
      pipe(map((dashboardResponse) => dashboardResponse.dashboards));
  }

  load(id: string) {
  }

  create(dashboard: Partial<Dashboard>) {
  }

  update(dashboard: Partial<Dashboard>) {
  }

  delete(id: string) {
  }
}
