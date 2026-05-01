import { Component, inject } from '@angular/core';
import { FilmService } from '../../../../core/services/film.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Autofocus } from '../../../../shared/directives/autofocus';
import { FilmCard } from "../../components/film-card/film-card";

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, Autofocus, FilmCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private filmService=inject(FilmService)


  films = this.filmService.filteredFilms;

onSearch(value: string) {
  this.filmService.setSearch(value);
}

  onFavorite(id: number) {
    this.filmService.toggleFavorite(id);
  }
}
