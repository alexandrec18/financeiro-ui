import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';
import { GlobalHttp } from 'app/seguranca/global-http';

@Injectable()
export class PermissaoService {

  permissoesUrl: string;

  constructor(
    private http: GlobalHttp
  ) {
    this.permissoesUrl = `${environment.apiUrl}/permissoes`;
  }

  listarTodas(): Promise<any> {

    return this.http.get<any>(this.permissoesUrl)
      .toPromise();
  }
}
