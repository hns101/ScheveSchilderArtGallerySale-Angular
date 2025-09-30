// src/app/core/services/filter.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Artwork } from '../models/artwork.model';

export interface FilterOptions {
  searchTerm: string;
  priceRange: { min: number; max: number } | null;
  materials: string[];
  dimensions: string[];
  sortBy: 'title' | 'price-asc' | 'price-desc' | 'artist' | null;
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private searchTermSubject = new BehaviorSubject<string>('');
  private priceRangeSubject = new BehaviorSubject<{ min: number; max: number } | null>(null);
  private materialsSubject = new BehaviorSubject<string[]>([]);
  private dimensionsSubject = new BehaviorSubject<string[]>([]);
  private sortBySubject = new BehaviorSubject<'title' | 'price-asc' | 'price-desc' | 'artist' | null>(null);

  // Expose observables
  searchTerm$ = this.searchTermSubject.asObservable();
  priceRange$ = this.priceRangeSubject.asObservable();
  materials$ = this.materialsSubject.asObservable();
  dimensions$ = this.dimensionsSubject.asObservable();
  sortBy$ = this.sortBySubject.asObservable();

  // Update methods
  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }

  setPriceRange(range: { min: number; max: number } | null): void {
    this.priceRangeSubject.next(range);
  }

  setMaterials(materials: string[]): void {
    this.materialsSubject.next(materials);
  }

  setDimensions(dimensions: string[]): void {
    this.dimensionsSubject.next(dimensions);
  }

  setSortBy(sortBy: 'title' | 'price-asc' | 'price-desc' | 'artist' | null): void {
    this.sortBySubject.next(sortBy);
  }

  // Reset all filters
  resetFilters(): void {
    this.searchTermSubject.next('');
    this.priceRangeSubject.next(null);
    this.materialsSubject.next([]);
    this.dimensionsSubject.next([]);
    this.sortBySubject.next(null);
  }

  // Main filtering method
  filterArtworks(artworks: Artwork[]): Observable<Artwork[]> {
    return combineLatest([
      this.searchTerm$,
      this.priceRange$,
      this.materials$,
      this.dimensions$,
      this.sortBy$
    ]).pipe(
      map(([searchTerm, priceRange, materials, dimensions, sortBy]) => {
        let filtered = [...artworks];

        // Filter by search term
        if (searchTerm) {
          const lowerSearch = searchTerm.toLowerCase();
          filtered = filtered.filter(artwork =>
            artwork.title.toLowerCase().includes(lowerSearch) ||
            artwork.artist.toLowerCase().includes(lowerSearch) ||
            artwork.description.en.toLowerCase().includes(lowerSearch) ||
            artwork.description.nl.toLowerCase().includes(lowerSearch)
          );
        }

        // Filter by price range
        if (priceRange && priceRange.min !== null && priceRange.max !== null) {
          filtered = filtered.filter(artwork =>
            artwork.price !== null &&
            artwork.price >= priceRange.min &&
            artwork.price <= priceRange.max
          );
        }

        // Filter by materials
        if (materials.length > 0) {
          filtered = filtered.filter(artwork =>
            materials.some(material =>
              artwork.material.toLowerCase().includes(material.toLowerCase())
            )
          );
        }

        // Filter by dimensions
        if (dimensions.length > 0) {
          filtered = filtered.filter(artwork =>
            dimensions.includes(artwork.dimensions)
          );
        }

        // Sort results
        if (sortBy) {
          filtered = this.sortArtworks(filtered, sortBy);
        }

        return filtered;
      })
    );
  }

  // Sorting helper
  private sortArtworks(
    artworks: Artwork[],
    sortBy: 'title' | 'price-asc' | 'price-desc' | 'artist'
  ): Artwork[] {
    const sorted = [...artworks];

    switch (sortBy) {
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'artist':
        return sorted.sort((a, b) => a.artist.localeCompare(b.artist));
      case 'price-asc':
        return sorted.sort((a, b) => {
          if (a.price === null) return 1;
          if (b.price === null) return -1;
          return a.price - b.price;
        });
      case 'price-desc':
        return sorted.sort((a, b) => {
          if (a.price === null) return 1;
          if (b.price === null) return -1;
          return b.price - a.price;
        });
      default:
        return sorted;
    }
  }

  // Helper to get unique values from artworks
  getUniqueMaterials(artworks: Artwork[]): string[] {
    const materials = artworks.map(a => a.material);
    return [...new Set(materials)].sort();
  }

  getUniqueDimensions(artworks: Artwork[]): string[] {
    const dimensions = artworks.map(a => a.dimensions);
    return [...new Set(dimensions)].sort();
  }

  getPriceRange(artworks: Artwork[]): { min: number; max: number } {
    const prices = artworks
      .filter(a => a.price !== null)
      .map(a => a.price as number);

    return {
      min: prices.length > 0 ? Math.min(...prices) : 0,
      max: prices.length > 0 ? Math.max(...prices) : 1000
    };
  }
}
