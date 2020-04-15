import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {firestore} from 'firebase';
import {Observable} from 'rxjs';
import {RetroService} from 'src/app/services/retro.service';
import {UserService} from 'src/app/services/user.service';
import {Retro} from 'types';

@Component({
  selector: 'app-retro',
  templateUrl: './retro.page.html',
  styleUrls: ['./retro.page.scss'],
})
export class RetroPage {
  id: string;
  playing = false;
  retro$: Observable<Retro>

  constructor(
      private readonly route: ActivatedRoute,
      private readonly retroService: RetroService,
      private readonly userService: UserService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.retro$ = this.retroService.getRetrospective(this.id);
    this.determinePlaying();
  }

  async determinePlaying() {
    const snapshot = await firestore()
                         .collection('retros')
                         .doc(this.id)
                         .collection('players')
                         .get();

    const playerIds = snapshot.docs.map(doc => doc.data().userId);
    const userId = await this.userService.getCurrentUserId();

    this.playing = playerIds.includes(userId);
  }
}
