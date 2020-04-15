import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetroPage } from './retro.page';

const routes: Routes = [
  {
    path: '',
    component: RetroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetroPageRoutingModule {}
