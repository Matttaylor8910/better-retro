import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {RetroService} from 'src/app/services/retro.service';
import {UserService} from 'src/app/services/user.service';
import {Retro} from 'types';

@Component({
  selector: 'app-retro',
  templateUrl: './retro.page.html',
  styleUrls: ['./retro.page.scss'],
})
export class RetroPage {
  private destroyed$ = new Subject<void>();

  id: string;
  playing = false;
  retro$: Observable<Retro>

  constructor(
      private readonly route: ActivatedRoute,
      private readonly retroService: RetroService,
      private readonly userService: UserService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.retro$ = this.retroService.getRetro(this.id);
    this.determinePlaying();
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
          this.playing = !!players.find(p => p.userId === userId);
        });
  }

  joinRetro() {
    this.retroService.joinRetro(this.id);
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
