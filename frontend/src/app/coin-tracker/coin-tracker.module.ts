import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinListItemComponent } from './coin-list-item/coin-list-item.component';
import { CoinListComponent } from './coin-list/coin-list.component';
import { CoinFormComponent } from './coin-form/coin-form.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CoinListItemComponent,
    CoinListComponent,
    CoinFormComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    CoinListItemComponent,
    CoinListComponent,
    CoinFormComponent,
  ]
})
export class CoinTrackerModule { }
