// src/app/shared/components/footer/footer.component.ts
import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <p class="copyright">
              © {{ currentYear }} Schilderschool De Scheve Schilder
            </p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #333;
      color: white;
      padding: 20px 0 20px;
      margin-top: 50px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      text-align: center;
    }

    .footer-section h3 {
      color: #007bff;
      margin-bottom: 15px;
      font-size: 1.1em;
    }

    .footer-section p {
      margin-bottom: 8px;
      color: #ccc;
    }

    .social-links {
      display: flex;
      gap: 20px;
      justify-content: center;
    }

    .social-link {
      color: #ccc;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .social-link:hover {
      color: #007bff;
    }

    .copyright {
      font-size: 0.9em;
      opacity: 0.8;
      margin-top: 20px;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .social-links {
        justify-content: center;
      }
    }
  `]
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}
