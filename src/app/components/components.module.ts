import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {RetroListComponent} from './retro-list/retro-list.component';
import {RetroStateComponent} from './retro-state/retro-state.component';

@NgModule({
  declarations: [
    RetroListComponent,
    RetroStateComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
  ],
  exports: [
    RetroListComponent,
    RetroStateComponent,
  ]
})
export class ComponentsModule {
}
