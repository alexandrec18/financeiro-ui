import { AuthService } from './../seguranca/auth.service';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


import 'rxjs/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { GlobalHttp } from 'app/seguranca/global-http';

@Injectable()
export class DashboardService {

  lancamentosUrl: string;

  constructor(
    private http: GlobalHttp,
    private auth: AuthService
  ) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentosPorCategoria(): Promise<Array<any>> {
    let params = new HttpParams();

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-categoria`,
        { params })
      .toPromise();
  }

  lancamentosPorDia(): Promise<Array<any>> {
    let params = new HttpParams();

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-dia`,
        { params })
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
