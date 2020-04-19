import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {RetroService} from 'src/app/services/retro.service';
import {Retro} from 'types';

@Component({
  selector: 'app-create-retro-modal',
  templateUrl: './create-retro-modal.page.html',
  styleUrls: ['./create-retro-modal.page.scss'],
})
export class CreateRetroModalPage {
  retro: Partial<Retro>;

  constructor(
      private readonly modalController: ModalController,
      private readonly retroService: RetroService,
      private readonly router: Router,
  ) {
    this.retro = {
      name: '',
      commentLists: [
        {header: 'Went Well', allowVoting: false},
        {header: 'Improvement Required', allowVoting: true},
      ],
      maxVotes: 3,
    }
  }

  get disabled(): boolean {
    const {name, commentLists, maxVotes} = this.retro;
    return name.length === 0 || commentLists.length === 0 || !maxVotes;
  }

  addList() {
    this.retro.commentLists.push({header: '', allowVoting: true});
  }

  removeList(index: number) {
    this.retro.commentLists.splice(index, 1);
  }

  async createRetro() {
    const docRef = await this.retroService.createRetro(this.retro);
    this.router.navigate(['retro', docRef.id]);
    this.modalController.dismiss();
  }
}
