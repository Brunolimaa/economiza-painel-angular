import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Loja } from '../model/loja.model';


@Injectable()
export class CadastroUserService {

    //url:string = 'https://economizamais.herokuapp.com/precos/loja/1';
    //url:string = 'https://economizamais.herokuapp.com/produtos';
    url:string = 'http://localhost:3001/precos/painel/';
    urlBase:string = 'http://localhost:3001/';


    constructor(private http: HttpClient, private storage: StorageService){

    }

    getUsers(idUsuario):Observable<Loja[]>{

        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer '+token});

        return this.http.get<Loja[]>(this.url+idUsuario, {'headers': authHeader});
    }

    cadastrarUsers(url: string, lojas: Loja){
        let token = this.storage.getLocalUser().token;
        let headers = new HttpHeaders({'Content-Type':'application/json'});

        return this.http.post(this.urlBase+""+url, lojas, {'headers': headers});
    }

    removeUsers(idLoja){
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer '+token});
        
        return this.http.delete(this.urlBase+"precos/"+idLoja, {'headers': authHeader})
    }
}