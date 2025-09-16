import { Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { ArtworkDetailComponent } from './artwork-detail/artwork-detail.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: '/gallery', pathMatch: 'full' },
  { path: 'gallery', component: GalleryComponent },
  { path: 'artworks/:id', component: ArtworkDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '/gallery' }
];
