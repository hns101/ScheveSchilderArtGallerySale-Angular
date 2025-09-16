// src/app/gallery/gallery.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../core/services/data.service';
import { TranslationService } from '../core/services/translation.service';
import { TranslatePipe } from '../shared/pipes/translate.pipe';
import { Artwork } from '../core/models/artwork.model';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  artworks$: Observable<Artwork[]>;
  currentLanguage: string = 'en';

  constructor(
    private dataService: DataService,
    private translationService: TranslationService
  ) {
    this.artworks$ = this.dataService.getArtworks();
  }

  ngOnInit(): void {
    this.translationService.getCurrentLanguage().subscribe(
      language => this.currentLanguage = language
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
