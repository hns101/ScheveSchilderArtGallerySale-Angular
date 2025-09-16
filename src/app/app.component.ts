import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { TranslationService } from './core/services/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="app">
      <app-header></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
      padding-top: 20px;
    }

    /* Global Styles */
    :host ::ng-deep {
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f8f9fa;
      }

      h1, h2, h3, h4, h5, h6 {
        margin-top: 0;
        font-weight: 600;
      }

      p {
        margin-bottom: 1rem;
      }

      a {
        color: #007bff;
        text-decoration: none;
        transition: color 0.3s ease;
      }

      a:hover {
        color: #0056b3;
      }

      button {
        font-family: inherit;
      }

      img {
        max-width: 100%;
        height: auto;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'scheve-schilder-gallery';

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    // Initialize with saved language or default to English
    const savedLanguage = localStorage.getItem('language') as 'en' | 'nl';
    if (savedLanguage) {
      this.translationService.setLanguage(savedLanguage);
    }
  }
}
