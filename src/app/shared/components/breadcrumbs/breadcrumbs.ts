import { Component, computed, inject, signal } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { FilmService } from '../../../core/services/film.service';
import { Crumb } from '../../models/crumb.models';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.css',
})
export class Breadcrumbs {

  private router = inject(Router);
  private filmService = inject(FilmService);

  private currentUrl = signal(this.router.url);

  private homeCrumb: Crumb = { label: 'Home', link: '/' };

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.set(this.router.url);
      }
    });
  }


  private getFilmId(url: string): number | null {
    const segments = url.split('/');

    if (segments.length >= 3 && segments[1] === 'film') {
      return Number(segments[2]);
    }

    return null;
  }


  crumbs = computed<Crumb[]>(() => {
    const url = this.currentUrl();

   
    if (url === '/') return [];

    const id = this.getFilmId(url);

    if (id !== null) {
      const film = this.filmService.getById(id);

      return [
        this.homeCrumb,
        { label: film?.title ?? 'Film', link: null }
      ];
    }

    if (url === '/about') {
      return [
        this.homeCrumb,
        { label: 'About', link: null }
      ];
    }

    return [];
  });
}