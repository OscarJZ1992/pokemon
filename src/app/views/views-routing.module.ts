import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [{
  path: 'PokemonList', component: PokemonListComponent
}, {
  path: "**",
  pathMatch: 'full',
  component: NotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
