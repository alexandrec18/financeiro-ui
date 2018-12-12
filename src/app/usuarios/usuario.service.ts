import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { AuthService } from './../seguranca/auth.service';
import { Usuario } from './../core/model';

import { GlobalHttp } from 'app/seguranca/global-http';
import { environment } from './../../environments/environment';

import 'rxjs/add/operator/toPromise';

export class UsuarioFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class UsuarioService {

  usuarioUrl: string;

  constructor(
    private http: GlobalHttp,
    private auth: AuthService
  ) {
    this.usuarioUrl = `${environment.apiUrl}/usuarios`;
  }

  pesquisar(filtro: UsuarioFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    if (this.auth.jwtPayload.empresa.codigo !== 1) {
      params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);
    }

    return this.http.get<any>(`${this.usuarioUrl}`,
        { params })
      .toPromise()
      .then(response => {
        const usuarios = response.content;

        const resultado = {
          usuarios,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    let params = new HttpParams();

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<any>(this.usuarioUrl,
        { params })
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void>  {

    return this.http.delete(`${this.usuarioUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(usuario: Usuario): Promise<Usuario> {

    return this.http.post<Usuario>(this.usuarioUrl, usuario)
      .toPromise();
  }

  atualizar(usuario: Usuario): Promise<Usuario> {

    return this.http.put<Usuario>(`${this.usuarioUrl}/${usuario.codigo}`, usuario)
      .toPromise()
      .then(response => {
        const usuarioAlterado = response;

        return usuarioAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Usuario> {

    return this.http.get<Usuario>(`${this.usuarioUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const usuario = response;

        return usuario;
      });
  }

}
