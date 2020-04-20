import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RetroService} from 'src/app/services/retro.service';
import {Player, Retro} from 'types';

@Component({
  selector: 'app-players-bar',
  templateUrl: './players-bar.component.html',
  styleUrls: ['./players-bar.component.scss'],
})
export class PlayersBarComponent implements OnInit {
  @Input() retro: Retro;

  players$: Observable<Player[]>

  constructor(
      private readonly retroService: RetroService,
  ) {}

  ngOnInit() {
    this.players$ = this.retroService.getRetroPlayers(this.retro.id);
  }
}
