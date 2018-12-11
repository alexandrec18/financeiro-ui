import { environment } from './../../environments/environment';
import { GlobalHttp } from './../seguranca/global-http';
import { Injectable } from '@angular/core';

@Injectable()
export class AeroportoService {

  aeroportosUrl: string;

  constructor(
    private http: GlobalHttp
  ) {
    this.aeroportosUrl = `${environment.apiUrl}/aeroportos`;
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(`${this.aeroportosUrl}`)
      .toPromise()
      .then();
  }
}
