import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxBootstrapIconsModule, chevronCompactRight, check2Square, app, emojiFrown, heart, heartFill} from 'ngx-bootstrap-icons';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CardComponent } from './card/card.component';
import { ModalComponent } from './modal/modal.component';
import { TableComponent } from './table/table.component';
import { CapitalizePipe } from '../pipes/formatUpperCase.pipe';

const icons = {
  chevronCompactRight,
  check2Square, 
  app,
  emojiFrown,
  heart,
heartFill
};




@NgModule({
  declarations: [
    NavBarComponent,
    CardComponent,
    ModalComponent,
    TableComponent,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    NgxBootstrapIconsModule.pick(icons),
  ],
  exports: [
    NavBarComponent,
    CardComponent,
    ModalComponent
  ]
})
export class ComponentsModule { }