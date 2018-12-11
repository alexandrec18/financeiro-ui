import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Transporte } from 'app/core/model';
import { environment } from './../../environments/environment';
import { AuthService } from './../seguranca/auth.service';
import { GlobalHttp } from './../seguranca/global-http';

import 'rxjs/add/operator/toPromise';

export class TransporteFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class TransporteService {

  transportesUrl: string;

  constructor(
    private http: GlobalHttp,
    private auth: AuthService
  ) {
    this.transportesUrl = `${environment.apiUrl}/transportes`;
  }

  pesquisar(filtro: TransporteFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<any>(`${this.transportesUrl}`,
        { params })
      .toPromise()
      .then(response => {
        const transportes = response.content;

        const resultado = {
          transportes,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    let params = new HttpParams();

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<any>(this.transportesUrl,
        { params })
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void>  {

    return this.http.delete(`${this.transportesUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(transporte: Transporte): Promise<Transporte> {

    transporte.empresa.codigo = this.auth.jwtPayload.empresa.codigo;

    return this.http.post<Transporte>(this.transportesUrl, transporte)
      .toPromise();
  }

  atualizar(transporte: Transporte): Promise<Transporte> {

    return this.http.put<Transporte>(`${this.transportesUrl}/${transporte.codigo}`, transporte)
      .toPromise()
      .then(response => {
        const transporteAlterada = response;

        return transporteAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Transporte> {

    return this.http.get<Transporte>(`${this.transportesUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const transporte = response;

        return transporte;
      });
  }

}
