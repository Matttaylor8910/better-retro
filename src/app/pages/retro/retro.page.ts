import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {RetroService} from 'src/app/services/retro.service';
import {Retrospective} from 'types';

@Component({
  selector: 'app-retro',
  templateUrl: './retro.page.html',
  styleUrls: ['./retro.page.scss'],
})
export class RetroPage {
  id: string;
  title = 'Loading...';
  retro$: Observable<Retrospective>

  constructor(
      private readonly route: ActivatedRoute,
      private readonly retroService: RetroService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.retro$ = this.retroService.getRetrospective(this.id);
  }
}
