import { Component, input, output } from '@angular/core';
import { Film } from '../../models/film.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-film-card',
  imports: [RouterModule],
  templateUrl: './film-card.html',
  styleUrl: './film-card.css',
})
export class FilmCard {
   
  film = input.required<Film>();

 
  favoriteClick = output<number>();

  onFavoriteClick(event: Event) {
    event.stopPropagation();
    this.favoriteClick.emit(this.film().id);
  }
}
