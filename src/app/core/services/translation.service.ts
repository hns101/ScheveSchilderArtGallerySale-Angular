import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage = new BehaviorSubject<string>('en');
  private translations: any = {};

  constructor(private http: HttpClient) {
    this.loadTranslations('en');
  }

  getCurrentLanguage(): Observable<string> {
    return this.currentLanguage.asObservable();
  }

  setLanguage(language: 'en' | 'nl'): void {
    this.loadTranslations(language);
    this.currentLanguage.next(language);
    localStorage.setItem('language', language);
  }

  private loadTranslations(language: string): void {
    this.http.get(`assets/i18n/${language}.json`).subscribe({
      next: (translations) => {
        this.translations = translations;
      },
      error: (error) => {
        console.error('Error loading translations:', error);
      }
    });
  }

  translate(key: string): string {
    return this.translations[key] || key;
  }

  getTranslations(): any {
    return this.translations;
  }
}
