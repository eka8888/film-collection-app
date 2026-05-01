import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FilmService } from '../../../../core/services/film.service';
import { CommonModule } from '@angular/common';
import { DurationPipe } from '../../../../shared/pipes/duration-pipe';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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

  filmId = toSignal(
    this.route.paramMap.pipe(
      map(params => Number(params.get('id')))
    ),
    { initialValue: Number(this.route.snapshot.paramMap.get('id')) }
  );

  film = computed(() => {
    const id = this.filmId();
    return this.filmService.getById(id);
  });
}