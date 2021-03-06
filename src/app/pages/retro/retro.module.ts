import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {ComponentsModule} from 'src/app/components/components.module';

import {RetroPage} from './retro.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{path: '', component: RetroPage}]),
  ],
  declarations: [
    RetroPage,
  ]
})
export class RetroPageModule {
}
