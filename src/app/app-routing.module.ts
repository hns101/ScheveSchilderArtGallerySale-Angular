import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { ArtworkDetailComponent } from './artwork-detail/artwork-detail.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/gallery', pathMatch: 'full' },
  { path: 'gallery', component: GalleryComponent },
  { path: 'artworks/:id', component: ArtworkDetailComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '/gallery' } // Redirect to gallery for unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
