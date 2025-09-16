// src/app/shared/components/modal/modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslationService } from '../../../core/services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Artwork } from '../../../core/models/artwork.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() artwork!: Artwork;
  @Output() closeModal = new EventEmitter<void>();

  purchaseForm: FormGroup;
  currentLanguage: string = 'en';

  constructor(
    private fb: FormBuilder,
    private translationService: TranslationService
  ) {
    this.purchaseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.translationService.getCurrentLanguage().subscribe(
      language => this.currentLanguage = language
    );
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  generateWhatsAppLink(): string {
    if (!this.purchaseForm.valid) {
      return '#';
    }

    const formData = this.purchaseForm.value;
    const message = this.currentLanguage === 'nl'
      ? `Hallo, ik ben geïnteresseerd in de aankoop van '${this.artwork.title}'. Mijn naam is ${formData.name} en mijn adres is ${formData.address}. Mijn e-mail is ${formData.email}.`
      : `Hello, I'm interested in buying '${this.artwork.title}'. My name is ${formData.name} and my address is ${formData.address}. My email is ${formData.email}.`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${environment.whatsappNumber}?text=${encodedMessage}`;
  }

  onSubmit(): void {
    if (this.purchaseForm.valid) {
      const whatsappLink = this.generateWhatsAppLink();
      window.open(whatsappLink, '_blank');
      this.onClose();
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.purchaseForm.controls).forEach(key => {
        this.purchaseForm.get(key)?.markAsTouched();
      });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.purchaseForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return this.translationService.translate(`modal.errors.${fieldName}.required`);
      }
      if (field.errors['email']) {
        return this.translationService.translate('modal.errors.email.invalid');
      }
      if (field.errors['minlength']) {
        return this.translationService.translate(`modal.errors.${fieldName}.minLength`);
      }
    }
    return '';
  }
}
