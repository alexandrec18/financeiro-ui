import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pacote } from 'app/core/model';
import { environment } from './../../environments/environment';
import { AuthService } from './../seguranca/auth.service';
import { GlobalHttp } from './../seguranca/global-http';

import 'rxjs/add/operator/toPromise';

export class PacoteFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PacoteService {

  pacotesUrl: string;

  constructor(
    private http: GlobalHttp,
    private auth: AuthService
  ) {
    this.pacotesUrl = `${environment.apiUrl}/pacotes`;
  }

  pesquisar(filtro: PacoteFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<any>(`${this.pacotesUrl}`,
        { params })
      .toPromise()
      .then(response => {
        const pacotes = response.content;

        const resultado = {
          pacotes,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    let params = new HttpParams();

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<any>(this.pacotesUrl,
        { params })
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void>  {

    return this.http.delete(`${this.pacotesUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(pacote: Pacote): Promise<Pacote> {

    pacote.empresa.codigo = this.auth.jwtPayload.empresa.codigo;

    return this.http.post<Pacote>(this.pacotesUrl, pacote)
      .toPromise();
  }

  atualizar(pacote: Pacote): Promise<Pacote> {

    return this.http.put<Pacote>(`${this.pacotesUrl}/${pacote.codigo}`, pacote)
      .toPromise()
      .then(response => {
        const pacoteAlterada = response;

        return pacoteAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Pacote> {

    return this.http.get<Pacote>(`${this.pacotesUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const pacote = response;

        return pacote;
      });
  }

}
