import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RetroService} from 'src/app/services/retro.service';
import {Player, Retrospective} from 'types';

@Component({
  selector: 'app-players-bar',
  templateUrl: './players-bar.component.html',
  styleUrls: ['./players-bar.component.scss'],
})
export class PlayersBarComponent implements OnInit {
  @Input() retro: Retrospective;

  players$: Observable<Player[]>

  constructor(
      private readonly retroService: RetroService,
  ) {}

  ngOnInit() {
    this.players$ = this.retroService.getRetrospectivePlayers(this.retro.id);
  }
}
