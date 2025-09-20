import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Artwork } from '../models/artwork.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private artworksUrl = 'data/artworks.json';

  // Fallback artwork data
  private fallbackArtworks: Artwork[] = [

  ];

  constructor(private http: HttpClient) { }

  getArtworks(): Observable<Artwork[]> {
    return this.http.get<Artwork[]>(this.artworksUrl).pipe(
      catchError(() => {
        console.log('Using fallback artwork data');
        return of(this.fallbackArtworks);
      })
    );
  }

  getArtwork(id: number): Observable<Artwork | undefined> {
    return this.getArtworks().pipe(
      map(artworks => artworks.find(artwork => artwork.id === id))
    );
  }
}
