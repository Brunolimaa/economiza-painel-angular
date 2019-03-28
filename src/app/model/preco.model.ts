import { Produto } from '../cadastro-prod/produtos/produto.model';
import { Loja } from './loja.model';

export class Preco {
    id: number;
    produto: Produto = new Produto();
    preco: number;
    validade: string;
    loja: Loja = new Loja();
}