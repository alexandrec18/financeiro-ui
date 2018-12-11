import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { SharedModule } from './../shared/shared.module';
import { TransportesRoutingModule } from './transportes-routing.module';
import { TransportesPesquisaComponent } from './transportes-pesquisa/transportes-pesquisa.component';
import { TransporteCadastroComponent } from './transporte-cadastro/transporte-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,

    SharedModule,
    TransportesRoutingModule
  ],
  declarations: [
    TransportesPesquisaComponent,
    TransporteCadastroComponent]
})
export class TransportesModule { }
