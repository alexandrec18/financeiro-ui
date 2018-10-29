import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NotAuthenticatedError } from './../seguranca/global-http';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    } else if  (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499)  {

        msg = 'Ocorreu um erro ao processar a sua solicitação!';

        if (errorResponse.status === 403) {
          msg = 'Você não tem permissão para executar está ação!';
        }

        try {
          msg = errorResponse.error[0].messagemUsuario;
        } catch (e) { }

        console.log('Ocorreu um erro 4xx', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente!';
      console.log('Ocorreu um erro!', errorResponse);
    }

    this.messageService.add({ severity: 'error', detail: msg});
  }
}
