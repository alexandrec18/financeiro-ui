import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Acomodacao } from './../core/model';
import { environment } from './../../environments/environment';
import { AuthService } from './../seguranca/auth.service';
import { GlobalHttp } from './../seguranca/global-http';

import 'rxjs/add/operator/toPromise';

export class AcomodacaoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class AcomodacaoService {

  acomodacoesUrl: string;

  constructor(
    private http: GlobalHttp,
    private auth: AuthService
  ) {
      this.acomodacoesUrl = `${environment.apiUrl}/acomodacoes`;
  }

  pesquisar(filtro: AcomodacaoFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<any>(`${this.acomodacoesUrl}`,
        { params })
      .toPromise()
      .then(response => {
        const acomodacoes = response.content;

        const resultado = {
          acomodacoes,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    let params = new HttpParams();

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<any>(this.acomodacoesUrl,
        { params })
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void>  {

    return this.http.delete(`${this.acomodacoesUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(acomodacao: Acomodacao): Promise<Acomodacao> {

    acomodacao.empresa.codigo = this.auth.jwtPayload.empresa.codigo;

    return this.http.post<Acomodacao>(this.acomodacoesUrl, acomodacao)
      .toPromise();
  }

  atualizar(acomodacao: Acomodacao): Promise<Acomodacao> {

    return this.http.put<Acomodacao>(`${this.acomodacoesUrl}/${acomodacao.codigo}`, acomodacao)
      .toPromise()
      .then(response => {
        const acomodacaoAlterada = response;

        return acomodacaoAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Acomodacao> {

    return this.http.get<Acomodacao>(`${this.acomodacoesUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const acomodacao = response;

        return acomodacao;
      });
  }

}
