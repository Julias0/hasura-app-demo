import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeramenuRoutingModule } from './meramenu-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    MeramenuRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MeramenuModule { }
