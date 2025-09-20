// src/app/about/about.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../core/services/translation.service';
import { TranslatePipe } from '../shared/pipes/translate.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  template: `
    <div class="about-container">
      <div class="about-hero">
        <div class="hero-content">
          <img src="images/scheveschildersign.png" alt="Scheve Schilder" class="artist-photo">
          <div class="hero-text">
            <h1>{{ 'about.title' | translate }}</h1>
            <p class="lead">{{ 'about.subtitle' | translate }}</p>
          </div>
        </div>
      </div>

      <div class="about-content">
        <section class="about-section">
          <h2>{{ 'about.story.title' | translate }}</h2>
          <p>{{ 'about.story.paragraph1' | translate }}</p>
          <p>{{ 'about.story.paragraph2' | translate }}</p>
        </section>

        <section class="about-section">
          <h2>{{ 'about.style.title' | translate }}</h2>
          <p>{{ 'about.style.description' | translate }}</p>
        </section>

        <section class="about-section">
          <h2>{{ 'about.contact.title' | translate }}</h2>
          <div class="contact-info">
            <p><strong>{{ 'about.contact.email' | translate }}:</strong> info@scheveschilder.nl</p>
            <p><strong>{{ 'about.contact.location' | translate }}:</strong> {{ 'about.contact.netherlands' | translate }}</p>
          </div>
        </section>

        <div class="back-to-gallery">
          <button routerLink="/gallery" class="btn-primary">
            {{ 'about.backToGallery' | translate }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .about-hero {
      text-align: center;
      margin-bottom: 60px;
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
    }

    .artist-photo {
      height: 270px;
      rotate: 9deg;
    }

    .hero-text h1 {
      font-size: 2.5em;
      color: #333;
      margin-bottom: 15px;
    }

    .lead {
      font-size: 1.2em;
      color: #666;
      max-width: 600px;
      line-height: 1.6;
    }

    .about-content {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .about-section {
      margin-bottom: 40px;
    }

    .about-section:last-of-type {
      margin-bottom: 30px;
    }

    .about-section h2 {
      color: #644e44;
      font-size: 1.5em;
      margin-bottom: 20px;
      border-bottom: 2px solid #644e44;
      padding-bottom: 10px;
    }

    .about-section p {
      color: #555;
      line-height: 1.8;
      font-size: 1.05em;
    }

    .contact-info p {
      margin-bottom: 12px;
    }

    .back-to-gallery {
      text-align: center;
      border-top: 1px solid #eee;
      padding-top: 30px;
    }

    .btn-primary {
      background-color: #644e44;
      color: white;
      border: none;
      padding: 12px 25px;
      font-size: 1em;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
    }

    .btn-primary:hover {
      background-color: #644e44;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px #644e44;
    }

    @media (max-width: 768px) {
      .about-container {
        padding: 20px 15px;
      }

      .about-content {
        padding: 25px;
      }

      .hero-text h1 {
        font-size: 2em;
      }

      .artist-photo {
        width: 150px;
        height: 150px;
      }
    }
  `]
})
export class AboutComponent implements OnInit {
  currentLanguage: string = 'en';

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.translationService.getCurrentLanguage().subscribe(
      language => this.currentLanguage = language
    );
  }
}
