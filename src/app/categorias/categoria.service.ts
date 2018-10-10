import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { Categoria } from './../core/model';
import { AuthService } from './../seguranca/auth.service';
import { environment } from './../../environments/environment';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

export class CategoriaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class CategoriaService {

  categoriasUrl: string;

  constructor(
    private http: AuthHttp,
    private auth: AuthService
  ) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  pesquisar(filtro: CategoriaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    params.set('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get(`${this.categoriasUrl}`,
        { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const categorias = responseJson.content;

        const resultado = {
          categorias,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    const params = new URLSearchParams();

    params.set('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get(this.categoriasUrl,
        { search: params })
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void>  {

    return this.http.delete(`${this.categoriasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(categoria: Categoria): Promise<Categoria> {

    categoria.empresa.codigo = this.auth.jwtPayload.empresa.codigo;

    return this.http.post(this.categoriasUrl,
        JSON.stringify(categoria))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(categoria: Categoria): Promise<Categoria> {

    return this.http.put(`${this.categoriasUrl}/${categoria.codigo}`,
        JSON.stringify(categoria))
      .toPromise()
      .then(response => {
        const categoriaAlterada = response.json() as Categoria;

        return categoriaAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Categoria> {

    return this.http.get(`${this.categoriasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const categoria = response.json() as Categoria;

        return categoria;
      });
  }

}
