import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorio-lancamentos-periodo',
  templateUrl: './relatorio-lancamentos-periodo.component.html',
  styleUrls: ['./relatorio-lancamentos-periodo.component.css']
})
export class RelatorioLancamentosPeriodoComponent implements OnInit {

  periodoInicio: Date;
  periodoFim: Date;

  constructor(
    private relatoriosService: RelatoriosService
  ) { }

  ngOnInit() {
  }

  gerar() {
    this.relatoriosService.relatorioLancamentosPorPeriodo(this.periodoInicio, this.periodoFim)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
      })
  }
}
