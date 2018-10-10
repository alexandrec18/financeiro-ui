export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Pessoa {
  codigo: number;
  nome: string;
  endereco = new Endereco();
  ativo: true;
  empresa = new Empresa();
}

export class Categoria {
  codigo: number;
  nome: string;
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
