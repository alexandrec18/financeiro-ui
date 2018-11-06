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
