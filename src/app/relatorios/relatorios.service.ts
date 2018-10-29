import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { GlobalHttp } from 'app/seguranca/global-http';

@Injectable()
export class RelatoriosService {

  lancamentosUrl: string;

  constructor(private http: GlobalHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
   }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {
    let params = new HttpParams();

    params = params.append('inicio', moment(inicio).format('YYYY-MM-DD'));
    params = params.append('fim', moment(fim).format('YYYY-MM-DD'));

    return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`,
      { params, responseType: 'blob' })
      .toPromise();
  }

}
