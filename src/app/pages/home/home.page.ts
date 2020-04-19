import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {RetroService} from 'src/app/services/retro.service';
import {CreateRetroModalPage} from '../create-retro-modal/create-retro-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  creating: boolean;
  name: string;

  constructor(
      private readonly modalController: ModalController,
      private readonly retroService: RetroService,
      private readonly router: Router,
  ) {}

  ngOnInit() {
    this.creating = false;
  }

  async create() {
    this.creating = true;
    const docRef = await this.retroService.createRetro({name: this.name});
    this.name = '';
    this.router.navigate(['retro', docRef.id]);
    this.creating = false;
  }

  async openCreateModal() {
    const modal = await this.modalController.create({
      component: CreateRetroModalPage,
    });

    await modal.present();
  }
}
