import { SharedModule } from './../shared/shared.module';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegimesRoutingModule } from './regimes-routing.module';
import { RegimesPesquisaComponent } from './regimes-pesquisa/regimes-pesquisa.component';
import { RegimeCadastroComponent } from './regime-cadastro/regime-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,

    SharedModule,

    RegimesRoutingModule
  ],
  declarations: [
    RegimesPesquisaComponent,
    RegimeCadastroComponent
  ]
})
export class RegimesModule { }
