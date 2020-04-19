import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {CreateRetroModalPage} from './create-retro-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [
    CreateRetroModalPage,
  ],
  entryComponents: [
    CreateRetroModalPage,
  ],
  exports: [
    CreateRetroModalPage,
  ],
})
export class CreateRetroModalPageModule {
}
