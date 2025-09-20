# Scheve Schilder Art Gallery Sale

A modern, responsive web application for showcasing and selling artwork created by art class students. This project provides an elegant digital gallery with integrated WhatsApp purchasing functionality.

## 🎨 Project Overview

This Angular-based art gallery application was created to help art students and instructors showcase and sell their artwork online. The application features a clean, professional design with bilingual support (English/Dutch) and a streamlined purchasing process through WhatsApp integration.

## ✨ Features

### 🖼️ Gallery Features
- **Responsive Art Gallery**: Beautiful grid layout showcasing artwork with high-quality images
- **Detailed Artwork View**: Individual pages for each piece with multiple image views
- **Artwork Information**: Complete details including dimensions, materials, pricing, and descriptions
- **Status Management**: Clear indicators for sold items and pieces not for sale

### 🌐 User Experience
- **Bilingual Support**: Full English and Dutch translations
- **Mobile Responsive**: Optimized for all device sizes
- **Smooth Navigation**: Clean, intuitive user interface
- **Loading States**: Professional loading indicators and error handling

### 💬 Purchase Integration
- **WhatsApp Integration**: Direct purchase inquiries through WhatsApp
- **Contact Form**: Structured form collection for buyer information
- **Automated Messaging**: Pre-formatted messages with artwork and buyer details
- **Shipping Coordination**: Built-in process for shipping and payment coordination

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Angular CLI (v20.3.1 or higher)
- A WhatsApp Business account for receiving purchase inquiries

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ScheveSchilderBackyardSale.git
   cd ScheveSchilderBackyardSale
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure WhatsApp Integration**
   
   Update the WhatsApp number in the environment files:
   ```typescript
   // src/environments/environment.ts
   export const environment = {
     production: false,
     whatsappNumber: '31612345678' // Replace with your WhatsApp number
   };
   ```

4. **Set up your artwork data**
   
   Add your artwork information to `public/data/artworks.json`:
   ```json
   [
     {
       "id": 1,
       "title": "Your Artwork Title",
       "artist": "Student Name",
       "description": {
         "en": "English description",
         "nl": "Dutch description"
       },
       "price": 150,
       "sold": false,
       "notForSale": false,
       "mainImage": "artwork1.png",
       "detailImages": [],
       "dimensions": "40x50 cm",
       "material": "Acrylic on canvas"
     }
   ]
   ```

5. **Add artwork images**
   
   Place your artwork images in the `public/images/` folder.

6. **Start the development server**
   ```bash
   ng serve
   ```

7. **Open your browser**
   
   Navigate to `http://localhost:4200`

## 📁 Project Structure

```
src/
├── app/
│   ├── about/                 # About page component
│   ├── artwork-detail/        # Individual artwork view
│   ├── gallery/              # Main gallery component
│   ├── core/
│   │   ├── models/           # TypeScript interfaces
│   │   └── services/         # Data and translation services
│   └── shared/
│       ├── components/       # Reusable components (header, footer, modal)
│       └── pipes/           # Translation pipe
├── environments/            # Environment configuration
└── public/
    ├── data/               # Artwork data (artworks.json)
    └── images/             # Artwork images
```

## 🛠️ Configuration

### Adding New Artwork

1. **Add artwork data** to `public/data/artworks.json`
2. **Place images** in `public/images/` folder
3. **Update translations** in `src/assets/i18n/` if needed

### Customizing WhatsApp Messages

The WhatsApp integration automatically generates messages in both languages. You can customize the message format in `modal.component.ts`:

```typescript
const message = this.currentLanguage === 'nl'
  ? `Hallo, ik ben geïnteresseerd in de aankoop van '${this.artwork.title}'...`
  : `Hello, I'm interested in buying '${this.artwork.title}'...`;
```

### Styling and Branding

- **Colors**: Update CSS variables in `src/styles.css`
- **Logo**: Replace the header title in `header.component.html`
- **Fonts**: Modify font families in the global styles

## 🌍 Internationalization

The application supports English and Dutch languages:

- **Translation files**: Located in `src/assets/i18n/`
- **Language switching**: Available in the header
- **Persistent selection**: Language preference is saved in localStorage

## 📱 WhatsApp Integration

### How It Works

1. **Customer Interest**: User clicks "Buy Now" on an artwork
2. **Form Completion**: Customer fills in contact and shipping information
3. **WhatsApp Redirect**: Application generates a WhatsApp message with:
   - Artwork details
   - Customer contact information
   - Shipping address
4. **Artist Response**: You receive the message and can respond with payment and shipping details

### Setting Up Your WhatsApp Number

1. **Format**: Use international format without + or spaces (e.g., `31612345678`)
2. **Business Account**: Recommended for professional appearance
3. **Testing**: Test the integration with a friend's number first

## 🚀 Deployment

### Build for Production

```bash
ng build --configuration production
```

### Deployment Options

- **Netlify**: Simple drag-and-drop deployment
- **Vercel**: GitHub integration with automatic deployments
- **GitHub Pages**: Free hosting for static sites
- **Firebase Hosting**: Google's hosting solution

## 🎯 Use Cases

- **Art Class Projects**: Perfect for showcasing student work
- **Local Artist Sales**: Individual artists selling their work
- **Art School Exhibitions**: Digital galleries for educational institutions
- **Small Art Businesses**: Simple e-commerce solution for artists

## 🔧 Technical Features

- **Angular 20**: Latest Angular framework
- **Standalone Components**: Modern Angular architecture
- **Reactive Forms**: Form validation and handling
- **RxJS**: Reactive programming for data management
- **CSS Custom Properties**: Easy theming and customization
- **TypeScript**: Type-safe development

## 🤝 Contributing

This is a student project, but suggestions and improvements are welcome! Feel free to:

1. Fork the project
2. Create a feature branch
3. Submit a pull request

## 📄 License

This project is created for educational purposes. Feel free to use and modify for your own art sales needs.

## 🙏 Acknowledgments

- Created for art class students to showcase and sell their work
- Inspired by the need for simple, effective online art sales
- Built with modern web technologies for a professional presentation

---

**Happy Selling! 🎨✨**

For questions or support, please contact through the application's WhatsApp integration or open an issue on GitHub.
