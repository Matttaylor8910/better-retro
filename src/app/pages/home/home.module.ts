import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {ComponentsModule} from 'src/app/components/components.module';

import {CreateRetroModalPageModule} from '../create-retro-modal/create-retro-modal.module';

import {HomePage} from './home.page';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    CreateRetroModalPageModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{path: '', component: HomePage}]),
  ],
  declarations: [HomePage]
})
export class HomePageModule {
}
