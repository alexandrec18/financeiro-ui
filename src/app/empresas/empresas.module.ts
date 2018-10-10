import { SharedModule } from './../shared/shared.module';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { EmpresasPesquisaComponent } from './empresas-pesquisa/empresas-pesquisa.component';
import { EmpresaCadastroComponent } from './empresa-cadastro/empresa-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
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
