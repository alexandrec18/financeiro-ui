import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MultiSelectModule } from 'primeng/components/multiselect/multiselect';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

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
    DataTableModule,
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
