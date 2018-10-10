import { Injectable } from '@angular/core';

import { Empresa } from './../core/model';
import { environment } from './../../environments/environment';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

export class EmpresaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class EmpresaService {

  empresaUrl: string;

  constructor(
    private http: AuthHttp
  ) {
    this.empresaUrl = `${environment.apiUrl}/empresas`;
  }

  pesquisar(filtro: EmpresaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.empresaUrl}`,
        { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const empresas = responseJson.content;

        const resultado = {
          empresas,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {

    return this.http.get(this.empresaUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void>  {

    return this.http.delete(`${this.empresaUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(empresa: Empresa): Promise<Empresa> {

    return this.http.post(this.empresaUrl,
        JSON.stringify(empresa))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(empresa: Empresa): Promise<Empresa> {

    return this.http.put(`${this.empresaUrl}/${empresa.codigo}`,
        JSON.stringify(empresa))
      .toPromise()
      .then(response => {
        const empresaAlterada = response.json() as Empresa;

        return empresaAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Empresa> {

    return this.http.get(`${this.empresaUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const empresa = response.json() as Empresa;

        return empresa;
      });
  }

}
