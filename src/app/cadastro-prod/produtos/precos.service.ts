import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './produto.model';
import { StorageService } from '../../services/storage.service';
import { Preco } from '../../model/preco.model';

@Injectable()
export class PrecosService {

    //url:string = 'https://economizamais.herokuapp.com/precos/loja/1';
    //url:string = 'https://economizamais.herokuapp.com/produtos';
    url:string = 'http://localhost:3001/precos/loja/1';
    urlBase:string = 'http://localhost:3001/';


    constructor(private http: HttpClient, private storage: StorageService){

    }

    getProdutos():Observable<Produto[]>{

        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer '+token});

        return this.http.get<Produto[]>(this.url, {'headers': authHeader});
    }

    cadastrarProdutos(url: string, preco: Preco){
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer '+token});

        return this.http.post(this.urlBase+""+url, preco, {'headers': authHeader});
    }

    atualizarProdutos(url: string, id: number, preco: Preco){
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer '+token});

        return this.http.put(`${this.urlBase}${url}/${id}`, preco, {'headers': authHeader})
    }


}