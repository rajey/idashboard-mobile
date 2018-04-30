import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../app/services/http-client.service';
import { getFavoriteUrl } from '../helpers';
import { of } from 'rxjs/observable/of';

@Injectable()
export class FavoriteService {
  constructor(private http: HttpClientService) {
  }

  getFavorite(favorite: {id: string, type: string}) {
    const favoriteUrl = getFavoriteUrl(favorite);
    return favoriteUrl ? this.http.get(favoriteUrl) : of(null);
  }
}
