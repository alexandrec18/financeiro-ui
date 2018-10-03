import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { NotAuthenticatedError } from './../seguranca/global-http';
import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private toasty: ToastyService,
    private router: Router) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    } else if  (errorResponse instanceof Response
      && errorResponse.status >= 400 && errorResponse.status <= 499)  {

        let errors;
        msg = 'Ocorreu um erro ao processar a sua solicitação!';

        if (errorResponse.status === 403) {
          msg = 'Você não tem permissão para executar está ação!';
        }

        try {
          errors = errorResponse.json();

          msg = errors[0].messagemUsuario;
        } catch (e) { }

        console.log('Ocorreu um erro 4xx', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente!';
      console.log('Ocorreu um erro!', errorResponse);
    }

    this.toasty.error(msg);
  }
}
