import { AuthService } from './../seguranca/auth.service';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { GlobalHttp } from 'app/seguranca/global-http';

@Injectable()
export class RelatoriosService {

  lancamentosUrl: string;

  constructor(
    private http: GlobalHttp,
    private auth: AuthService
  ) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {
    let params = new HttpParams();

    params = params.append('inicio', moment(inicio).format('YYYY-MM-DD'));
    params = params.append('fim', moment(fim).format('YYYY-MM-DD'));
    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`,
      { params, responseType: 'blob' })
      .toPromise();
  }

  relatorioLancamentosPorPeriodo(inicio: Date, fim: Date) {
    let params = new HttpParams();

    params = params.append('inicio', moment(inicio).format('YYYY-MM-DD'));
    params = params.append('fim', moment(fim).format('YYYY-MM-DD'));
    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get(`${this.lancamentosUrl}/relatorios/por-periodo`,
      { params, responseType: 'blob' })
      .toPromise();
  }

}
