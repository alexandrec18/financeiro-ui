import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

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
    TableModule,
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
