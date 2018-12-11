import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Regime } from 'app/core/model';
import { environment } from './../../environments/environment';
import { AuthService } from './../seguranca/auth.service';
import { GlobalHttp } from './../seguranca/global-http';

import 'rxjs/add/operator/toPromise';

export class RegimeFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class RegimeService {

  regimesUrl: string;

  constructor(
    private http: GlobalHttp,
    private auth: AuthService
  ) {
    this.regimesUrl = `${environment.apiUrl}/regimes`;
  }

  pesquisar(filtro: RegimeFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<any>(`${this.regimesUrl}`,
        { params })
      .toPromise()
      .then(response => {
        const regimes = response.content;

        const resultado = {
          regimes,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    let params = new HttpParams();

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<any>(this.regimesUrl,
        { params })
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void>  {

    return this.http.delete(`${this.regimesUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(regime: Regime): Promise<Regime> {

    regime.empresa.codigo = this.auth.jwtPayload.empresa.codigo;

    return this.http.post<Regime>(this.regimesUrl, regime)
      .toPromise();
  }

  atualizar(regime: Regime): Promise<Regime> {

    return this.http.put<Regime>(`${this.regimesUrl}/${regime.codigo}`, regime)
      .toPromise()
      .then(response => {
        const regimeAlterada = response;

        return regimeAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Regime> {

    return this.http.get<Regime>(`${this.regimesUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const regime = response;

        return regime;
      });
  }

}
