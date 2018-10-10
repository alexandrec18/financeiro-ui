import { AuthService } from './../seguranca/auth.service';
import { Usuario } from './../core/model';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

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
    private http: AuthHttp,
    private auth: AuthService
  ) {
    this.usuarioUrl = `${environment.apiUrl}/usuarios`;
  }

  pesquisar(filtro: UsuarioFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    params.set('empresa', this.auth.jwtPayload.empresa.codigo);

    console.log(this.auth.jwtPayload.empresa.codigo);

    return this.http.get(`${this.usuarioUrl}`,
        { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const usuarios = responseJson.content;

        const resultado = {
          usuarios,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {

    return this.http.get(this.usuarioUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void>  {

    return this.http.delete(`${this.usuarioUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(usuario: Usuario): Promise<Usuario> {

    return this.http.post(this.usuarioUrl,
        JSON.stringify(usuario))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(usuario: Usuario): Promise<Usuario> {

    return this.http.put(`${this.usuarioUrl}/${usuario.codigo}`,
        JSON.stringify(usuario))
      .toPromise()
      .then(response => {
        const usuarioAlterado = response.json() as Usuario;

        return usuarioAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Usuario> {

    return this.http.get(`${this.usuarioUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const usuario = response.json() as Usuario;

        return usuario;
      });
  }

}
