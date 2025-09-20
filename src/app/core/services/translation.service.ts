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
        subtitle: 'Discover the unique world of artworks from the members of Schilderschool De Scheve Schilder'
      },
      about: {
        title: 'About Schilderschool De Scheve Schilder',
        subtitle: 'Discover the story behind Schilderschool De Scheve Schilder and its talented artists.',
        story: {
          title: 'Our Story',
          paragraph1: 'Welcome to our artistic community! Schilderschool De Scheve Schilder is an art school in the Netherlands, founded and led by the passionate teacher, Scheve Schilder.',
          paragraph2: 'Our mission is to guide and inspire new artists. This gallery showcases the unique work of our students, offering you a glimpse into their creative journeys.'
        },
        style: {
          title: 'Our Artistic Community',
          description: 'Our students explore a wide range of mediums, including oil paintings, watercolors, mixed media, and more. This diversity reflects the individuality of each artist we mentor.'
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
        processDescription: 'Fill in your details and click "Send via WhatsApp". The artist will contact you to confirm the sale, arrange shipping costs, and provide a payment link. Once payment is completed, the artist will ship the artwork to you.',
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
        title: 'Kunstgalerie',
        subtitle: 'Ontdek de unieke wereld van kunstwerken gemaakt door de leden van Schilderschool De Scheve Schilder.'
      },
      about: {
        title: 'Over Schilderschool De Scheve Schilder',
        subtitle: 'Ontdek het verhaal achter Schilderschool De Scheve Schilder en zijn getalenteerde kunstenaars.',
        story: {
          title: 'Ons Verhaal',
          paragraph1: 'Welkom bij onze artistieke gemeenschap! Schilderschool De Scheve Schilder is een kunstschool in Nederland, opgericht en geleid door de gepassioneerde docent, Scheve Schilder.',
          paragraph2: 'Onze missie is het begeleiden en inspireren van nieuwe kunstenaars. Deze galerij toont het unieke werk van onze studenten en geeft u een kijkje in hun creatieve reis.'
        },
        style: {
          title: 'Onze Artistieke Gemeenschap',
          description: 'Onze studenten verkennen een breed scala aan media, waaronder olieverfschilderijen, aquarellen, mixed media en meer. Deze diversiteit weerspiegelt de individualiteit van elke kunstenaar die we begeleiden.'
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
        processDescription: 'U vult uw gegevens in en klikt op "Verzenden via WhatsApp". De kunstenaar zal contact met u opnemen om de aankoop te bevestigen, de verzendkosten te bepalen en een betaallink te sturen. Zodra de betaling is voltooid, zal de kunstenaar het kunstwerk naar u opsturen.',
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
