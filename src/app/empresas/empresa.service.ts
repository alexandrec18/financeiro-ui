import { AuthService } from './../seguranca/auth.service';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Empresa } from './../core/model';
import { environment } from './../../environments/environment';

import 'rxjs/add/operator/toPromise';
import { GlobalHttp } from 'app/seguranca/global-http';

export class EmpresaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class EmpresaService {

  empresaUrl: string;

  constructor(
    private http: GlobalHttp,
    private auth: AuthService
  ) {
    this.empresaUrl = `${environment.apiUrl}/empresas`;
  }

  pesquisar(filtro: EmpresaFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    if (this.auth.jwtPayload.empresa.codigo !== 1) {
      params = params.append('codigo', this.auth.jwtPayload.empresa.codigo);
    }

    return this.http.get<any>(`${this.empresaUrl}`, { params })
      .toPromise()
      .then(response => {
        const empresas = response.content;

        const resultado = {
          empresas,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {

    return this.http.get<any>(this.empresaUrl)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void>  {

    return this.http.delete(`${this.empresaUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(empresa: Empresa): Promise<Empresa> {

    return this.http.post<Empresa>(this.empresaUrl, empresa)
      .toPromise();
  }

  atualizar(empresa: Empresa): Promise<Empresa> {

    return this.http.put<Empresa>(`${this.empresaUrl}/${empresa.codigo}`, empresa)
      .toPromise()
      .then(response => {
        const empresaAlterada = response;

        return empresaAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Empresa> {

    return this.http.get<Empresa>(`${this.empresaUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const empresa = response;

        return empresa;
      });
  }

}
