import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CategoriasModule } from './categorias/categorias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EmpresasModule } from './empresas/empresas.module';
import { AcomodacoesModule } from './acomodacoes/acomodacoes.module';
import { TipoAcomodacoesModule } from './tipo-acomodacoes/tipo-acomodacoes.module';
import { RegimesModule } from './regime/regimes.module';
import { PacotesModule } from './pacotes/pacotes.module';
import { TransportesModule } from './transportes/transportes.module';
import { MoedasModule } from './moedas/moedas.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    CategoriasModule,
    UsuariosModule,
    EmpresasModule,
    AcomodacoesModule,
    TipoAcomodacoesModule,
    RegimesModule,
    PacotesModule,
    TransportesModule,
    MoedasModule,
    SegurancaModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
