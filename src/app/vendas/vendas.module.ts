import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { SharedModule } from './../shared/shared.module';
import { VendasRoutingModule } from './vendas-routing.module';
import { VendasPesquisaComponent } from './vendas-pesquisa/vendas-pesquisa.component';
import { VendaCadastroComponent } from './venda-cadastro/venda-cadastro.component';
import { VendaCadastroProdutoComponent } from './venda-cadastro-produto/venda-cadastro-produto.component';
import { VendaCadastroProdutoHospedagemComponent } from './venda-cadastro-produto-hospedagem/venda-cadastro-produto-hospedagem.component';
import { VendaCadastroProdutoAereaComponent } from './venda-cadastro-produto-aerea/venda-cadastro-produto-aerea.component';
import { VendaCadastroProdutoTuristicoComponent } from './venda-cadastro-produto-turistico/venda-cadastro-produto-turistico.component';
import { VendaCadastroProdutoTrechoComponent } from './venda-cadastro-produto-trecho/venda-cadastro-produto-trecho.component';
import { VendaCadastroProdutoPassageiroComponent } from './venda-cadastro-produto-passageiro/venda-cadastro-produto-passageiro.component';
import { VendaCadastroProdutoValoresComponent } from './venda-cadastro-produto-valores/venda-cadastro-produto-valores.component';
import { VendaCadastroPagamentoComponent } from './venda-cadastro-pagamento/venda-cadastro-pagamento.component';
import { VendaCadastroPagamentoProdutoComponent } from './venda-cadastro-pagamento-produto/venda-cadastro-pagamento-produto.component';
import { VendaCadastroProdutoGenericoComponent } from './venda-cadastro-produto-generico/venda-cadastro-produto-generico.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    CardModule,
    CurrencyMaskModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DropdownModule,
    CalendarModule,
    TabViewModule,
    PanelModule,
    SplitButtonModule,
    DialogModule,
    ProgressSpinnerModule,
    OverlayPanelModule,

    SharedModule,

    VendasRoutingModule
  ],
  declarations: [
    VendasPesquisaComponent,
    VendaCadastroComponent,
    VendaCadastroProdutoComponent,
    VendaCadastroProdutoHospedagemComponent,
    VendaCadastroProdutoAereaComponent,
    VendaCadastroProdutoTuristicoComponent,
    VendaCadastroProdutoTrechoComponent,
    VendaCadastroProdutoPassageiroComponent,
    VendaCadastroProdutoValoresComponent,
    VendaCadastroPagamentoComponent,
    VendaCadastroPagamentoProdutoComponent,
    VendaCadastroProdutoGenericoComponent
  ]
})
export class VendasModule { }
