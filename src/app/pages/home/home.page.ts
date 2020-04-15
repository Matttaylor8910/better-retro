import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RetroService} from 'src/app/services/retro.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  creating: boolean;

  constructor(
      private readonly retroService: RetroService,
      private readonly router: Router,
  ) {}

  ngOnInit() {
    this.creating = false;
  }

  async create(name: string) {
    this.creating = true;
    const docRef = await this.retroService.createRetro({name});
    this.router.navigate(['retro', docRef.id]);
    this.creating = false;
  }
}
