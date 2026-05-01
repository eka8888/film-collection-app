import { Component, computed, inject, signal } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.currentUrl.set(this.router.url);
      });
  }

  crumbs = computed<Crumb[]>(() => {
    const url = this.currentUrl();

    if (url === '/') return [];

    if (url.startsWith('/film/')) {
      const id = Number(url.split('/')[2]);
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