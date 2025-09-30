// src/app/gallery/components/gallery-filters/gallery-filters.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../core/services/filter.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { Artwork } from '../../../core/models/artwork.model';

@Component({
  selector: 'app-gallery-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './gallery-filters.component.html',
  styleUrls: ['./gallery-filters.component.css']
})
export class GalleryFiltersComponent implements OnInit {
  @Input() allArtworks: Artwork[] = [];

  searchTerm: string = '';
  selectedMaterials: string[] = [];
  selectedDimensions: string[] = [];
  selectedSortBy: string = '';
  priceMin: number = 0;
  priceMax: number = 1000;

  availableMaterials: string[] = [];
  availableDimensions: string[] = [];
  priceRange: { min: number; max: number } = { min: 0, max: 1000 };

  showFilters: boolean = false;

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.initializeFilterOptions();
  }

  ngOnChanges(): void {
    this.initializeFilterOptions();
  }

  initializeFilterOptions(): void {
    if (this.allArtworks.length > 0) {
      this.availableMaterials = this.filterService.getUniqueMaterials(this.allArtworks);
      this.availableDimensions = this.filterService.getUniqueDimensions(this.allArtworks);
      this.priceRange = this.filterService.getPriceRange(this.allArtworks);
      this.priceMin = this.priceRange.min;
      this.priceMax = this.priceRange.max;
    }
  }

  onSearchChange(): void {
    this.filterService.setSearchTerm(this.searchTerm);
  }

  onPriceRangeChange(): void {
    if (this.priceMin !== this.priceRange.min || this.priceMax !== this.priceRange.max) {
      this.filterService.setPriceRange({ min: this.priceMin, max: this.priceMax });
    } else {
      this.filterService.setPriceRange(null);
    }
  }

  onMaterialChange(material: string, event: any): void {
    if (event.target.checked) {
      this.selectedMaterials.push(material);
    } else {
      this.selectedMaterials = this.selectedMaterials.filter(m => m !== material);
    }
    this.filterService.setMaterials(this.selectedMaterials);
  }

  onDimensionChange(dimension: string, event: any): void {
    if (event.target.checked) {
      this.selectedDimensions.push(dimension);
    } else {
      this.selectedDimensions = this.selectedDimensions.filter(d => d !== dimension);
    }
    this.filterService.setDimensions(this.selectedDimensions);
  }

  onSortChange(): void {
    const sortValue = this.selectedSortBy as 'title' | 'price-asc' | 'price-desc' | 'artist' | null;
    this.filterService.setSortBy(sortValue || null);
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedMaterials = [];
    this.selectedDimensions = [];
    this.selectedSortBy = '';
    this.priceMin = this.priceRange.min;
    this.priceMax = this.priceRange.max;
    this.filterService.resetFilters();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  isMaterialSelected(material: string): boolean {
    return this.selectedMaterials.includes(material);
  }

  isDimensionSelected(dimension: string): boolean {
    return this.selectedDimensions.includes(dimension);
  }

  hasActiveFilters(): boolean {
    return this.searchTerm !== '' ||
      this.selectedMaterials.length > 0 ||
      this.selectedDimensions.length > 0 ||
      this.selectedSortBy !== '' ||
      this.priceMin !== this.priceRange.min ||
      this.priceMax !== this.priceRange.max;
  }
}
