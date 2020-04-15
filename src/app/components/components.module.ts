import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {CommentCardComponent} from './comment-card/comment-card.component';
import {CommentListComponent} from './comment-list/comment-list.component';
import {PlayersBarComponent} from './players-bar/players-bar.component';
import {RetroListComponent} from './retro-list/retro-list.component';
import {RetroStateComponent} from './retro-state/retro-state.component';
import {StateProgressBarComponent} from './state-progress-bar/state-progress-bar.component';

@NgModule({
  declarations: [
    CommentCardComponent,
    CommentListComponent,
    PlayersBarComponent,
    RetroListComponent,
    RetroStateComponent,
    StateProgressBarComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    CommentCardComponent,
    CommentListComponent,
    PlayersBarComponent,
    RetroListComponent,
    RetroStateComponent,
    StateProgressBarComponent,
  ]
})
export class ComponentsModule {
}
