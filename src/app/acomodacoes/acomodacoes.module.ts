import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { SharedModule } from './../shared/shared.module';
import { AcomodacoesRoutingModule } from './acomodacoes-routing.module';
import { AcomodacaoCadastroComponent } from './acomodacao-cadastro/acomodacao-cadastro.component';
import { AcomodacoesPesquisaComponent } from './acomodacoes-pesquisa/acomodacoes-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,

    SharedModule,
    AcomodacoesRoutingModule
  ],
  declarations: [
    AcomodacaoCadastroComponent,
    AcomodacoesPesquisaComponent
  ]
})
export class AcomodacoesModule { }
