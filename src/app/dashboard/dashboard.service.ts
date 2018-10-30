import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


import 'rxjs/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { GlobalHttp } from 'app/seguranca/global-http';

@Injectable()
export class DashboardService {

  lancamentosUrl: string;

  constructor(private http: GlobalHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentosPorCategoria(): Promise<Array<any>> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-categoria`,
        { headers, withCredentials: true })
      .toPromise();
  }

  lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
        const dados = response;
        this.converterStringsParaDatas(dados);

        return dados;
      });
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
