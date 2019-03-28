import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './produto.model';
import { StorageService } from '../../services/storage.service';
import { Loja } from '../../model/loja.model';

@Injectable()
export class ProdutosService {

    //url:string = 'https://economizamais.herokuapp.com/precos/loja/1';
    //url:string = 'https://economizamais.herokuapp.com/produtos';
    url:string = 'http://localhost:3001/precos/painel/';
    urlBase:string = 'http://localhost:3001/';


    constructor(private http: HttpClient, private storage: StorageService){

    }

    getProdutos(idUsuario):Observable<Produto[]>{

        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer '+token});

        return this.http.get<Produto[]>(this.url+idUsuario, {'headers': authHeader});
    }

    cadastrarProdutos(url: string, produtos: Produto){
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer '+token});

        return this.http.post(this.urlBase+""+url, produtos, {'headers': authHeader});
    }

    removeProduto(idProduto){
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer '+token});
        
        return this.http.delete(this.urlBase+"precos/"+idProduto, {'headers': authHeader})
    }
}