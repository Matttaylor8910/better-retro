import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {RetroPageRoutingModule} from './retro-routing.module';
import {RetroPage} from './retro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetroPageRoutingModule,
  ],
  declarations: [
    RetroPage,
  ]
})
export class RetroPageModule {
}
