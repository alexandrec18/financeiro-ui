
export class Estado {
  codigo: number;
  nome: string;
}

export class Cidade {
  codigo: number;
  nome: string;
  estado = new Estado();
}

export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade = new Cidade();
}

export class Fisica {
  dataNascimento: Date;
  sexo: string;
  cpf: string;
  rg: string;
  numeroPassaporte: string;
  validadePassaporte: Date;
  telefoneResidencial: string;
  telefoneCelular: string;
  telefoneComercial: string;
};

export class Juridica {
  razaoSocial: string;
  cnpj: string;
  inscricaoEstadual: string;
  website: string;
  telefone: string;
};

export class Contato {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;

  constructor(codigo?: number,
    nome?: string,
    email?: string,
    telefone?: string){
      this.codigo = codigo;
      this.nome = nome;
      this.email = email;
      this.telefone = telefone;
    }
}

export class Pessoa {
  codigo: number;
  nome: string;
  endereco = new Endereco();
  ativo: true;
  empresa = new Empresa();
  contatos = Array<Contato>();
  fisica = new Fisica();
  juridica = new Juridica();
  inscricaoMunicipal: string;
  observacao: string;
  email: string;
  tipo: string;
  dataCadastro: Date;
  usuarioCadastro = new Usuario();
}

export class Categoria {
  codigo: number;
  nome: string;
  empresa = new Empresa();
}

export class Acomodacao {
  codigo: number;
  nome: string;
  empresa = new Empresa();
}

export class TipoAcomodacao {
  codigo: number;
  nome: string;
  empresa = new Empresa();
}

export class Regime {
  codigo: number;
  nome: string;
  empresa = new Empresa();
}

export class Pacote {
  codigo: number;
  nome: string;
  empresa = new Empresa();
}

export class Transporte {
  codigo: number;
  nome: string;
  empresa = new Empresa();
}

export class Moeda {
  codigo: number;
  sigla: string;
  nome: string;
  simbolo: string;
  empresa = new Empresa();
}

export class Lancamento {
  codigo: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
  empresa = new Empresa();
}

export class Venda {
  codigo: number;
  dataVenda = new Date;
  numero: number;
  situacao = 'ABERTA';
  empresa = new Empresa();
  vendedor = new Usuario();
  pagante = new Pessoa();
  periodoInicial: Date;
  periodoFinal: Date;
  intermediario = new Pessoa();
  solicitante = new Pessoa();
  observacao: String;
  dataCadastro: Date;
  usuarioCadastro = new Usuario();
  totalProdutos: number;
  totalFinal: number;
  vendaProduto = Array<VendaProduto>();
  vendaFormaPagamento = Array<VendaFormaPagamento>();
}

export class VendaProduto {
  codigo: number;
  produto: string;
  fornecedor = new Pessoa();
  representante = new Pessoa();
  dataInicio: Date;
  horaInicio: Date;
  dataFim: Date;
  horaFim: Date;
  acomodacao = new Acomodacao();
  tipoAcomodacao = new TipoAcomodacao();
  regime = new Regime();
  pacote = new Pacote();
  transporte = new Transporte();
  servicosInclusos: string;
  documento: string;
  destino: string;
  vendaProdutoPassageiro = Array<VendaProdutoPassageiro>();
  vendaProdutoTrecho = Array<VendaProdutoTrecho>();
  valoresVendaProduto = new ValoresVendaProduto();
  numeroNf: string;
  numeroExterno: string;
  reciboOperadora: string;
  observacao: string;

  constructor(
    codigo?: number,
    produto?: string,
    fornecedor = new Pessoa(),
    representante = new Pessoa(),
    dataInicio?: Date,
    horaInicio?: Date,
    dataFim?: Date,
    horaFim?: Date,
    acomodacao = new Acomodacao,
    tipoAcomodacao = new TipoAcomodacao,
    regime = new Regime,
    pacote = new Pacote,
    transporte = new Transporte,
    servicosInclusos?: string,
    documento?: string,
    destino?: string,
    vendaProdutoPassageiro = Array<VendaProdutoPassageiro>(),
    vendaProdutoTrecho = Array<VendaProdutoTrecho>(),
    valoresVendaProduto = new ValoresVendaProduto(),
    numeroNf?: string,
    numeroExterno?: string,
    reciboOperadora?: string,
    observacao?: string) {
      this.codigo = codigo,
      this.produto = produto,
      this.fornecedor = fornecedor,
      this.representante = representante,
      this.dataInicio = dataInicio,
      this.horaInicio = horaInicio,
      this.dataFim = dataFim,
      this.horaFim = horaFim,
      this.acomodacao = acomodacao,
      this.tipoAcomodacao = tipoAcomodacao,
      this.regime = regime,
      this.pacote = pacote,
      this.transporte = transporte,
      this.servicosInclusos = servicosInclusos,
      this.documento = documento,
      this.destino = destino,
      this.vendaProdutoPassageiro = vendaProdutoPassageiro,
      this.vendaProdutoTrecho = vendaProdutoTrecho,
      this.valoresVendaProduto = valoresVendaProduto,
      this.numeroNf = numeroNf,
      this.numeroExterno = numeroExterno,
      this.reciboOperadora = reciboOperadora,
      this.observacao = observacao
    }
}

export class VendaFormaPagamento {
  codigo: number;
  formaPagamento: string;
  parcelas: number;
  autorizacao: string;
  numero: string;
  data: Date;
  banco: string;
  agencia: string;
  contaCorrente: string;
  valorTotal: number;
  vendaFormaPagamentoProduto = Array<VendaFormaPagamentoProduto>();

  constructor (
    codigo?: number,
    formaPagamento?: string,
    parcelas?: number,
    autorizacao?: string,
    numero?: string,
    data?: Date,
    banco?: string,
    agencia?: string,
    contaCorrente?: string,
    valorTotal?: number,
    vendaFormaPagamentoProduto = Array<VendaFormaPagamentoProduto>()) {
      this.codigo = codigo,
      this.formaPagamento = formaPagamento,
      this.parcelas = parcelas,
      this.autorizacao = autorizacao,
      this.numero = numero,
      this.data = data,
      this.banco = banco,
      this.agencia = agencia,
      this.contaCorrente = contaCorrente,
      this.valorTotal = valorTotal,
      this.vendaFormaPagamentoProduto = vendaFormaPagamentoProduto
    }
}

export class VendaFormaPagamentoProduto {
  codigo: number;
  produto: string;
  valor: number;

  constructor (
    codigo?: number,
    produto?: string,
    valor?: number) {
      this.codigo = codigo,
      this.produto = produto,
      this.valor = valor
    }
}

export class ValoresVendaProduto {
  comissaoPorcentagem: number;
  comissaoValor: number;
  overPorcentagem: number;
  overSobre: number;
  overValor: number;
  codigoMoeda = new Moeda();
  cambioValor: number;
  operadoraAbatimentos: number;
  operadoraTaxaCcRav: number;
  agenciaTaxaServDestac: number;
  agenciaDesconto: number;
  totalProduto: number;
  totalProdutoBrl: number;
  valorTotal: number;
  valorTotalBrl: number;
  saldo: number;
  saldoBrl: number;
}

export class VendaProdutoPassageiro {
  codigo: number;
  passageiro = new Pessoa();
  nomeEmissao: string;
  moedaOrigem = new Moeda();
  cambioValor: number;
  valorProduto: number;
  valorProdutoBrl: number;
  taxas: number;
  taxasBrl: number;
  outrasTaxas: number;
  outrasTaxasBrl: number;
  taxaRav: number;
  taxaRavBrl: number;
  taxaDu: number;
  taxaDuBrl: number;
  taxaServicoOculta: number;
  taxaServicoOcultaBrl: number;
  valorTotal: number;
  valorTotalBrl: number;
  centroCusto: string;
  documento: string;

    constructor(
      codigo?: number,
      passageiro = new Pessoa(),
      nomeEmissao?: string,
      moedaOrigem = new Moeda(),
      cambioValor?: number,
      valorProduto?: number,
      valorProdutoBrl?: number,
      taxas?: number,
      taxasBrl?: number,
      outrasTaxas?: number,
      outrasTaxasBrl?: number,
      taxaRav?: number,
      taxaRavBrl?: number,
      taxaDu?: number,
      taxaDuBrl?: number,
      taxaServicoOculta?: number,
      taxaServicoOcultaBrl?: number,
      valorTotal?: number,
      valorTotalBrl?: number,
      centroCusto?: string,
      documento?: string) {
        this.codigo = codigo,
        this.passageiro = passageiro,
        this.nomeEmissao = nomeEmissao,
        this.moedaOrigem = moedaOrigem,
        this.cambioValor = cambioValor,
        this.valorProduto = valorProduto,
        this.valorProdutoBrl = valorProdutoBrl,
        this.taxas = taxas,
        this.taxasBrl = taxasBrl,
        this.outrasTaxas = outrasTaxas,
        this.outrasTaxasBrl = outrasTaxasBrl,
        this.taxaRav = taxaRav,
        this.taxaRavBrl = taxaRavBrl,
        this.taxaDu = taxaDu,
        this.taxaDuBrl = taxaDuBrl,
        this.taxaServicoOculta = taxaServicoOculta,
        this.taxaServicoOcultaBrl = taxaServicoOcultaBrl,
        this.valorTotal = valorTotal,
        this.valorTotalBrl = valorTotalBrl,
        this.centroCusto = centroCusto,
        this.documento = documento
      }

}

export class VendaProdutoTrecho {
  codigo: number;
  ciaAerea: string;
  voo: string;
  classe: string;
  aeroportoOrigem = new Aeroporto();
  dataSaida: Date;
  horaSaida: Date;
  aeroportoDestino = new Aeroporto();
  dataChegada: Date;
  horaChegada: Date;

  constructor(codigo?: number,
    ciaAerea?: string,
    voo?: string,
    classe?: string,
    aeroportoOrigem = new Aeroporto(),
    dataSaida?: Date,
    horaSaida?: Date,
    aeroportoDestino = new Aeroporto(),
    dataChegada?: Date,
    horaChegada?: Date) {
      this.codigo = codigo,
      this.ciaAerea =  ciaAerea,
      this.voo = voo,
      this.classe = classe,
      this.aeroportoOrigem = aeroportoOrigem,
      this.dataSaida = dataSaida,
      this.horaSaida = horaSaida,
      this.aeroportoDestino = aeroportoDestino,
      this.dataChegada = dataChegada,
      this.horaChegada = horaChegada
  }

}

export class Aeroporto {
  codigo: number;
  iata: string;
  nome: string;
  cidade: string;
  pais: string;
}

export class Empresa {
  codigo: number;
  nome: string;
}

export class Usuario {
  codigo: number;
  nome: string;
  email: string;
  senha: string;
  empresa = new Empresa();
  permissoes = [];
}
