import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewsRoutingModule } from './views-routing.module';
import { ComponentsModule } from '../components/components.module';
import { NgxBootstrapIconsModule, emojiFrown } from 'ngx-bootstrap-icons';

import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

const icons = {
  emojiFrown
};

@NgModule({
  declarations: [
    PokemonListComponent,
    NotFoundComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ViewsRoutingModule,
    ComponentsModule,
    NgxBootstrapIconsModule.pick(icons),
  ],
  exports: [
    PokemonListComponent,
    NotFoundComponent
  ]
})
export class ViewsModule { }
