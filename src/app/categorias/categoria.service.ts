import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Categoria } from './../core/model';
import { AuthService } from './../seguranca/auth.service';
import { environment } from './../../environments/environment';
import { GlobalHttp } from 'app/seguranca/global-http';

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
    private http: GlobalHttp,
    private auth: AuthService
  ) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  pesquisar(filtro: CategoriaFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.append('page', filtro.pagina.toString());
    params = params.append('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<any>(`${this.categoriasUrl}`,
        { params })
      .toPromise()
      .then(response => {
        const categorias = response.content;

        const resultado = {
          categorias,
          total: response.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    let params = new HttpParams();

    params = params.append('empresa', this.auth.jwtPayload.empresa.codigo);

    return this.http.get<any>(this.categoriasUrl,
        { params })
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void>  {

    return this.http.delete(`${this.categoriasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(categoria: Categoria): Promise<Categoria> {

    categoria.empresa.codigo = this.auth.jwtPayload.empresa.codigo;

    return this.http.post<Categoria>(this.categoriasUrl, categoria)
      .toPromise();
  }

  atualizar(categoria: Categoria): Promise<Categoria> {

    return this.http.put<Categoria>(`${this.categoriasUrl}/${categoria.codigo}`, categoria)
      .toPromise()
      .then(response => {
        const categoriaAlterada = response;

        return categoriaAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Categoria> {

    return this.http.get<Categoria>(`${this.categoriasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const categoria = response;

        return categoria;
      });
  }

}
