import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {RetroService} from 'src/app/services/retro.service';
import {UserService} from 'src/app/services/user.service';
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
      private readonly router: Router,
  ) {
    this.retros$ = this.retroService.getRetrospectives();
  }

  async join(retro: Retrospective) {
    const name = await this.userService.getCurrentUserName();
    this.router.navigate(['retro', retro.id]);
  }
}
