import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage = new BehaviorSubject<string>('en');
  private translations: any = {};

  private fallbackTranslations = {
    en: {
      nav: { gallery: 'Gallery', about: 'About' },
      gallery: {
        title: 'Art Gallery',
        subtitle: 'Discover the unique and vibrant world of Scheve Schilder\'s artwork'
      },
      about: {
        title: 'About the Artist',
        subtitle: 'Discover the story behind Scheve Schilder\'s unique artistic journey',
        story: {
          title: 'My Story',
          paragraph1: 'Welcome to my artistic world! I\'m Scheve Schilder, a passionate artist from the Netherlands.',
          paragraph2: 'Through my work, I aim to bring joy and inspiration to people\'s lives.'
        },
        style: {
          title: 'My Artistic Style',
          description: 'My work spans various mediums including oil paintings, watercolors, and mixed media.'
        },
        contact: {
          title: 'Get in Touch',
          email: 'Email',
          location: 'Location',
          netherlands: 'The Netherlands'
        },
        backToGallery: 'Back to Gallery'
      },
      detail: {
        backToGallery: 'Back to Gallery',
        by: 'by',
        dimensions: 'Dimensions',
        material: 'Material',
        buyNow: 'Buy Now'
      },
      modal: {
        title: 'Purchase Artwork',
        by: 'by',
        processDescription: 'Fill in your details and click "Send via WhatsApp". Wait for a response from the artist, who will send you an invoice based on shipping costs and a payment link. Once payment is completed, the artist will ship the artwork to you.',
        form: {
          name: 'Full Name',
          namePlaceholder: 'Enter your full name',
          email: 'Email Address',
          emailPlaceholder: 'Enter your email address',
          address: 'Shipping Address',
          addressPlaceholder: 'Enter your complete shipping address'
        },
        cancel: 'Cancel',
        sendWhatsApp: 'Send via WhatsApp',
        errors: {
          name: {
            required: 'Name is required',
            minLength: 'Name must be at least 2 characters'
          },
          email: {
            required: 'Email is required',
            invalid: 'Please enter a valid email address'
          },
          address: {
            required: 'Address is required',
            minLength: 'Please enter a complete address'
          }
        }
      },
      artwork: { sold: 'Sold', notForSale: 'Not For Sale' },
      footer: {
        contact: 'Contact',
        artist: 'Artist',
        followUs: 'Follow Us',
        allRightsReserved: 'All rights reserved'
      }
    },
    nl: {
      nav: { gallery: 'Galerij', about: 'Over' },
      gallery: {
        title: 'Kunstgalerij',
        subtitle: 'Ontdek de unieke en levendige wereld van Scheve Schilder\'s kunstwerken'
      },
      about: {
        title: 'Over de Kunstenaar',
        subtitle: 'Ontdek het verhaal achter Scheve Schilder\'s unieke artistieke reis',
        story: {
          title: 'Mijn Verhaal',
          paragraph1: 'Welkom in mijn artistieke wereld! Ik ben Scheve Schilder, een gepassioneerde kunstenaar uit Nederland.',
          paragraph2: 'Door mijn werk probeer ik vreugde en inspiratie te brengen in het leven van mensen.'
        },
        style: {
          title: 'Mijn Artistieke Stijl',
          description: 'Mijn werk omvat verschillende media, waaronder olieverfschilderijen, aquarellen en mixed media.'
        },
        contact: {
          title: 'Neem Contact Op',
          email: 'E-mail',
          location: 'Locatie',
          netherlands: 'Nederland'
        },
        backToGallery: 'Terug naar Galerij'
      },
      detail: {
        backToGallery: 'Terug naar Galerij',
        by: 'door',
        dimensions: 'Afmetingen',
        material: 'Materiaal',
        buyNow: 'Koop Nu'
      },
      modal: {
        title: 'Kunstwerk Kopen',
        by: 'door',
        processDescription: 'U vult uw adresgegevens in en klikt op "Verzenden via WhatsApp". Wacht op een antwoord van de kunstenaar, die u een factuur zal sturen op basis van de verzendkosten en een betalingslink. Zodra de betaling is voltooid, zal de kunstenaar het kunstwerk naar u opsturen.',
        form: {
          name: 'Volledige Naam',
          namePlaceholder: 'Voer uw volledige naam in',
          email: 'E-mailadres',
          emailPlaceholder: 'Voer uw e-mailadres in',
          address: 'Verzendadres',
          addressPlaceholder: 'Voer uw complete verzendadres in'
        },
        cancel: 'Annuleren',
        sendWhatsApp: 'Verzenden via WhatsApp',
        errors: {
          name: {
            required: 'Naam is verplicht',
            minLength: 'Naam moet minstens 2 karakters bevatten'
          },
          email: {
            required: 'E-mail is verplicht',
            invalid: 'Voer een geldig e-mailadres in'
          },
          address: {
            required: 'Adres is verplicht',
            minLength: 'Voer een volledig adres in'
          }
        }
      },
      artwork: { sold: 'Verkocht', notForSale: 'Niet Te Koop' },
      footer: {
        contact: 'Contact',
        artist: 'Kunstenaar',
        followUs: 'Volg Ons',
        allRightsReserved: 'Alle rechten voorbehouden'
      }
    }
  };

  constructor(private http: HttpClient) {
    this.loadTranslations('en');
  }

  getCurrentLanguage(): Observable<string> {
    return this.currentLanguage.asObservable();
  }

  setLanguage(language: 'en' | 'nl'): void {
    this.currentLanguage.next(language);
    this.loadTranslations(language);
    localStorage.setItem('language', language);
  }

  private loadTranslations(language: string): void {
    // Always use fallback translations (since file loading is failing)
    this.translations = this.fallbackTranslations[language as keyof typeof this.fallbackTranslations] || this.fallbackTranslations.en;
    console.log('Using complete fallback translations for:', language);
  }

  translate(key: string): string {
    const keys = key.split('.');
    let result = this.translations;

    for (const k of keys) {
      if (result && typeof result === 'object' && result[k] !== undefined) {
        result = result[k];
      } else {
        console.warn(`Missing translation for: ${key}`);
        return key;
      }
    }

    return typeof result === 'string' ? result : key;
  }
}
