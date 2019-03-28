import { Endereco } from './endereco.model';

export class Loja {
    id: string;
    razaoSocial: string;
    eslogan: string;
    telefone: string;
    email: string;
    cnpj: string;
    image: string;
    endereco: Endereco = new Endereco();
}