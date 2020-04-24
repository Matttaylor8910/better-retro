import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AuthService} from 'src/app/services/auth.service';
import {RetroService} from 'src/app/services/retro.service';
import {UserService} from 'src/app/services/user.service';
import {Player, Retro} from 'types';

@Component({
  selector: 'app-retro',
  templateUrl: './retro.page.html',
  styleUrls: ['./retro.page.scss'],
})
export class RetroPage {
  private destroyed$ = new Subject<void>();

  id: string;
  me?: Player;
  retro$: Observable<Retro>

  constructor(
      private readonly route: ActivatedRoute,
      private readonly retroService: RetroService,
      private readonly userService: UserService,
      private readonly authService: AuthService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.retro$ = this.retroService.getRetro(this.id);
    this.determinePlaying();
  }

  get playing(): boolean {
    return this.me && this.me.userId === this.authService.currentUserId;
  }

  shouldWrap(retro: Retro): boolean {
    const MIN_LIST_WIDTH = 400;
    return window.innerWidth / retro.commentLists.length < MIN_LIST_WIDTH;
  }

  async determinePlaying() {
    const userId = await this.userService.getCurrentUserId();

    this.retroService.getRetroPlayers(this.id)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(players => {
          this.me = players.find(p => p.userId === userId);
        });
  }

  toggleReady() {
    const {ready = false, userId} = this.me;
    this.retroService.updateRetroPlayer(this.id, userId, {ready: !ready});
  }

  joinRetro() {
    this.retroService.joinRetro(this.id);
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
