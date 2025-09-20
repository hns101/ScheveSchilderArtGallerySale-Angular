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

  // Fallback artwork data
  private fallbackArtworks: Artwork[] = [
    {
      id: 1,
      title: "Sunny Days",
      artist: "Scheve Schilder",
      description: {
        en: "A beautiful painting depicting a sunny day in the Dutch countryside.",
        nl: "Een prachtig schilderij dat een zonnige dag op het Nederlandse platteland weergeeft."
      },
      price: 150,
      sold: false,
      notForSale: false,
      mainImage: "artwork1.png",
      detailImages: ["artwork1_detail1.png", "artwork1_detail2.png"],
      dimensions: "40x50 cm",
      material: "Acrylic on canvas"
    },
    {
      id: 2,
      title: "Amsterdam Sunset",
      artist: "Scheve Schilder",
      description: {
        en: "A vibrant sunset over the Amsterdam canals.",
        nl: "Een levendige zonsondergang over de Amsterdamse grachten."
      },
      price: null,
      sold: false,
      notForSale: true,
      mainImage: "artwork2.png",
      detailImages: [],
      dimensions: "60x80 cm",
      material: "Oil on wood panel"
    },
    {
      id: 3,
      title: "Dutch Windmills",
      artist: "Scheve Schilder",
      description: {
        en: "Traditional Dutch windmills in a serene landscape.",
        nl: "Traditionele Nederlandse windmolens in een sereen landschap."
      },
      price: 200,
      sold: true,
      notForSale: false,
      mainImage: "artwork3.png",
      detailImages: ["artwork3_detail1.png"],
      dimensions: "50x70 cm",
      material: "Oil on canvas"
    }
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
