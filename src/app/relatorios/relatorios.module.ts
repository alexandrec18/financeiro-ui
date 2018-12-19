import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule } from 'primeng/calendar';

import { SharedModule } from './../shared/shared.module';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';
import { RelatorioLancamentosPeriodoComponent } from './relatorio-lancamentos-periodo/relatorio-lancamentos-periodo.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    CalendarModule,

    SharedModule,
    RelatoriosRoutingModule
  ],
  declarations: [RelatorioLancamentosComponent, RelatorioLancamentosPeriodoComponent]
})
export class RelatoriosModule { }
