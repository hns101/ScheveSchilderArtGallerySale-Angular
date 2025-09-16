import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentLanguage: string = 'en';

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.translationService.getCurrentLanguage().subscribe(
      language => this.currentLanguage = language
    );
  }

  switchLanguage(language: 'en' | 'nl'): void {
    this.translationService.setLanguage(language);
  }
}
