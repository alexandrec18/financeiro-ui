import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { SharedModule } from './../shared/shared.module';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';
import { CategoriasPesquisaComponent } from './categorias-pesquisa/categorias-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,

    FormsModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,

    SharedModule,

    CategoriasRoutingModule
  ],
  declarations: [
    CategoriaCadastroComponent,
    CategoriasPesquisaComponent
  ]
})
export class CategoriasModule { }
