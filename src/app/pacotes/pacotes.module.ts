import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { SharedModule } from './../shared/shared.module';
import { PacotesRoutingModule } from './pacotes-routing.module';
import { PacotesPesquisaComponent } from './pacotes-pesquisa/pacotes-pesquisa.component';
import { PacoteCadastroComponent } from './pacote-cadastro/pacote-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,

    SharedModule,
    PacotesRoutingModule
  ],
  declarations: [
    PacotesPesquisaComponent,
    PacoteCadastroComponent]
})
export class PacotesModule { }
