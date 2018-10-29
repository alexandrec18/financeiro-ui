import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from './../shared/shared.module';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuariosPesquisaComponent } from './usuarios-pesquisa/usuarios-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DropdownModule,

    SharedModule,
    MultiSelectModule,
    UsuariosRoutingModule
  ],
  declarations: [
    UsuariosPesquisaComponent,
    UsuarioCadastroComponent
  ]
})

export class UsuariosModule { }
