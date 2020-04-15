import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {RetroService} from 'src/app/services/retro.service';
import {UserService} from 'src/app/services/user.service';
import {UtilService} from 'src/app/services/util.service';
import {Retrospective} from 'types';

@Component({
  selector: 'app-retro-list',
  templateUrl: './retro-list.component.html',
  styleUrls: ['./retro-list.component.scss'],
})
export class RetroListComponent {
  retros$: Observable<Retrospective[]>;

  constructor(
      private readonly retroService: RetroService,
      private readonly userService: UserService,
      private readonly utilService: UtilService,
  ) {
    this.retros$ = this.retroService.getRetrospectives();
  }

  async join(retro: Retrospective) {
    const name = await this.userService.getCurrentUserName();
    this.utilService.showToast(`Sorry ${name}, you can't join ${retro.name}!`);
    console.log(`Nav to /retro/${retro.id}`);
  }
}
