import { computed, Injectable, signal } from '@angular/core';
import { FILMS } from '../../features/films/models/films.data';
import { Film } from '../../features/films/models/film.model';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private films = signal<Film[]>(FILMS);
  private searchTerm = signal<string>('');

  allFilms = computed(() => this.films());

  filteredFilms = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
 if (!term) return this.films();
    return this.films().filter(film =>
      film.title.toLowerCase().includes(term)
    );
  });

  favoriteFilms = computed(() =>
    this.films().filter(film => film.isFavorite)
  );

  setSearch(term: string): void {
    this.searchTerm.set(term);
  }

  getById(id: number): Film | undefined {
    return this.films().find(film => film.id === id);
  }

  toggleFavorite(id: number): void {
    this.films.update(films =>
      films.map(film =>
        film.id === id
          ? { ...film, isFavorite: !film.isFavorite }
          : film
      )
    );
  }
}