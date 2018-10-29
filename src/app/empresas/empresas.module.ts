import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { SharedModule } from './../shared/shared.module';
import { EmpresasRoutingModule } from './empresas-routing.module';
import { EmpresasPesquisaComponent } from './empresas-pesquisa/empresas-pesquisa.component';
import { EmpresaCadastroComponent } from './empresa-cadastro/empresa-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,

    SharedModule,

    EmpresasRoutingModule
  ],
  declarations: [
    EmpresasPesquisaComponent,
    EmpresaCadastroComponent
  ]
})

export class EmpresasModule { }
