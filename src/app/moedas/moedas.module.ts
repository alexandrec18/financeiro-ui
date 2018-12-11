import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { SharedModule } from './../shared/shared.module';
import { MoedasRoutingModule } from './moedas-routing.module';
import { MoedasPesquisaComponent } from './moedas-pesquisa/moedas-pesquisa.component';
import { MoedaCadastroComponent } from './moeda-cadastro/moeda-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,

    SharedModule,
    MoedasRoutingModule
  ],
  declarations: [
    MoedasPesquisaComponent,
    MoedaCadastroComponent
  ]
})
export class MoedasModule { }
