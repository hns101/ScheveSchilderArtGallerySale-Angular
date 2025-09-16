// src/app/artwork-detail/artwork-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../core/services/data.service';
import { TranslationService } from '../core/services/translation.service';
import { TranslatePipe } from '../shared/pipes/translate.pipe';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { Artwork } from '../core/models/artwork.model';

@Component({
  selector: 'app-artwork-detail',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ModalComponent],
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.css']
})
export class ArtworkDetailComponent implements OnInit {
  artwork$: Observable<Artwork | undefined>;
  currentLanguage: string = 'en';
  selectedImage: string = '';
  showModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private translationService: TranslationService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.artwork$ = this.dataService.getArtwork(id);
  }

  ngOnInit(): void {
    this.translationService.getCurrentLanguage().subscribe(
      language => this.currentLanguage = language
    );

    this.artwork$.subscribe(artwork => {
      if (artwork) {
        this.selectedImage = artwork.mainImage;
      }
    });
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  canPurchase(artwork: Artwork): boolean {
    return !artwork.sold && !artwork.notForSale && artwork.price !== null;
  }

  getStatusText(artwork: Artwork): string {
    if (artwork.sold) {
      return this.translationService.translate('artwork.sold');
    }
    if (artwork.notForSale) {
      return this.translationService.translate('artwork.notForSale');
    }
    return '';
  }

  goBack(): void {
    this.router.navigate(['/gallery']);
  }
}
