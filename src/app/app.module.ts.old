import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ArtworkDetailComponent } from './artwork-detail/artwork-detail.component';
import { AboutComponent } from './about/about.component';

// Services
import { DataService } from './core/services/data.service';
import { TranslationService } from './core/services/translation.service';

// Pipes
import { TranslatePipe } from './shared/pipes/translate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    GalleryComponent,
    ArtworkDetailComponent,
    AboutComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService,
    TranslationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
