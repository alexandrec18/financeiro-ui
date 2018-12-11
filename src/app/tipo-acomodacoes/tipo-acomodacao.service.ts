import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
import { AuthService } from './../seguranca/auth.service';
import { GlobalHttp } from './../seguranca/global-http';
import { TipoAcomodacao } from 'app/core/model';

import 'rxjs/add/operator/toPromise';

export class TipoAcomodacaoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class TipoAcomodacaoService {

  tipoAcomodacoesUrl: string;

  constructor(
    private http: GlobalHttp,
    private auth: AuthService
  ) {
    this.tipoAcomodacoesUrl = `${environment.apiUrl}/tipo-acomodacoes`;
  }

  pesquisar(filtro: TipoAcomodacaoFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<any>(`${this.tipoAcomodacoesUrl}`,
        { params })
      .toPromise()
      .then(response => {
        const tipoAcomodacoes = response.content;

        const resultado = {
          tipoAcomodacoes,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    let params = new HttpParams();

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<any>(this.tipoAcomodacoesUrl,
        { params })
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void>  {

    return this.http.delete(`${this.tipoAcomodacoesUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(tipoAcomodacao: TipoAcomodacao): Promise<TipoAcomodacao> {

    tipoAcomodacao.empresa.codigo = this.auth.jwtPayload.empresa.codigo;

    return this.http.post<TipoAcomodacao>(this.tipoAcomodacoesUrl, tipoAcomodacao)
      .toPromise();
  }

  atualizar(tipoAcomodacao: TipoAcomodacao): Promise<TipoAcomodacao> {

    return this.http.put<TipoAcomodacao>(`${this.tipoAcomodacoesUrl}/${tipoAcomodacao.codigo}`, tipoAcomodacao)
      .toPromise()
      .then(response => {
        const tipoAcomodacaoAlterada = response;

        return tipoAcomodacaoAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<TipoAcomodacao> {

    return this.http.get<TipoAcomodacao>(`${this.tipoAcomodacoesUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const tipoAcomodacao = response;

        return tipoAcomodacao;
      });
  }

}
