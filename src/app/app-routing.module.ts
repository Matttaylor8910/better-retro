import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
        import('./pages/home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'retro/:id',
    loadChildren: () =>
        import('./pages/retro/retro.module').then(m => m.RetroPageModule),
  },
];

@NgModule({
  imports:
      [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}
