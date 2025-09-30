// src/app/gallery/gallery.component.ts (UPDATED)
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DataService } from '../core/services/data.service';
import { FilterService } from '../core/services/filter.service';
import { TranslationService } from '../core/services/translation.service';
import { TranslatePipe } from '../shared/pipes/translate.pipe';
import { GalleryFiltersComponent } from './components/gallery-filters/gallery-filters.component';
import { Artwork } from '../core/models/artwork.model';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe, GalleryFiltersComponent],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  allArtworks$: Observable<Artwork[]>;
  filteredArtworks$!: Observable<Artwork[]>;
  allArtworks: Artwork[] = [];
  currentLanguage: string = 'en';
  resultCount: number = 0;

  constructor(
    private dataService: DataService,
    private filterService: FilterService,
    private translationService: TranslationService
  ) {
    this.allArtworks$ = this.dataService.getArtworks();
  }

  ngOnInit(): void {
    // Subscribe to language changes
    this.translationService.getCurrentLanguage().subscribe(
      language => this.currentLanguage = language
    );

    // Store all artworks for the filter component
    this.allArtworks$.subscribe(artworks => {
      this.allArtworks = artworks;
    });

    // Create filtered artworks observable
    this.filteredArtworks$ = this.allArtworks$.pipe(
      switchMap(artworks => this.filterService.filterArtworks(artworks)),
      map(artworks => {
        this.resultCount = artworks.length;
        return artworks;
      })
    );
  }

  getPrice(artwork: Artwork): string {
    if (artwork.sold) {
      return this.translationService.translate('artwork.sold');
    }
    if (artwork.notForSale || artwork.price === null) {
      return this.translationService.translate('artwork.notForSale');
    }
    return `€${artwork.price}`;
  }

  isPurchasable(artwork: Artwork): boolean {
    return !artwork.sold && !artwork.notForSale && artwork.price !== null;
  }
}
