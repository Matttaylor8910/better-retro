import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {RetroService} from 'src/app/services/retro.service';
import {UserService} from 'src/app/services/user.service';
import {Retro, RETRO_STATE} from 'types';

@Component({
  selector: 'app-retro-list',
  templateUrl: './retro-list.component.html',
  styleUrls: ['./retro-list.component.scss'],
})
export class RetroListComponent {
  retros$: Observable<Retro[]>;

  constructor(
      private readonly retroService: RetroService,
      private readonly router: Router,
      private readonly alertController: AlertController,
  ) {
    this.retros$ = this.retroService.getRetros();
  }

  async promptJoin(retro: Retro) {
    if (retro.state === RETRO_STATE.FINISHED ||
        await this.retroService.playerIsInRetro(retro.id)) {
      this.navToRetro(retro);
    } else {
      const alert = await this.alertController.create({
        header: 'Join as',
        buttons: [
          {
            text: 'Spectator',
            cssClass: 'secondary',
            handler: () => {
              this.navToRetro(retro);
            }
          },
          {
            text: 'Player',
            handler: () => {
              this.join(retro);
            }
          }
        ]
      });

      await alert.present();
    }
  }

  async join(retro: Retro) {
    await this.retroService.joinRetro(retro.id);
    this.navToRetro(retro);
  }

  navToRetro(retro: Retro) {
    this.router.navigate(['retro', retro.id]);
  }
}
