import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FilmService } from '../../../../core/services/film.service';
import { CommonModule } from '@angular/common';
import { DurationPipe } from '../../../../shared/pipes/duration-pipe';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DurationPipe],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {

  private route = inject(ActivatedRoute);
  private filmService = inject(FilmService);

  private id = Number(this.route.snapshot.paramMap.get('id'));

  film = computed(() => {
  const film = this.filmService.getById(this.id);

  if (!film) {
    console.error('Film not found');
    return null;
  }

  return film;
});
}