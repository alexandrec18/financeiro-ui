import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { SharedModule } from './../shared/shared.module';
import { TipoAcomodacaoCadastroComponent } from './tipo-acomodacao-cadastro/tipo-acomodacao-cadastro.component';
import { TipoAcomodacoesPesquisaComponent } from './tipo-acomodacoes-pesquisa/tipo-acomodacoes-pesquisa.component';
import { TipoAcomodacoesRoutingModule } from './tipo-acomodacoes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,

    SharedModule,

    TipoAcomodacoesRoutingModule
  ],
  declarations: [
    TipoAcomodacaoCadastroComponent,
    TipoAcomodacoesPesquisaComponent
  ]
})
export class TipoAcomodacoesModule { }
