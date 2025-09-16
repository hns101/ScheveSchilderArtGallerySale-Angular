import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Artwork } from '../models/artwork.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private artworksUrl = 'assets/data/artworks.json';

  constructor(private http: HttpClient) { }

  getArtworks(): Observable<Artwork[]> {
    return this.http.get<Artwork[]>(this.artworksUrl).pipe(
      catchError(this.handleError<Artwork[]>('getArtworks', []))
    );
  }

  getArtwork(id: number): Observable<Artwork | undefined> {
    return this.getArtworks().pipe(
      map(artworks => artworks.find(artwork => artwork.id === id))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
