import { Injectable } from '@angular/core'; 
import { HttpClient } from "@angular/common/http";
import { Precos } from './precos.modelo';
import { Observable } from 'rxjs';


@Injectable()
export class TaskService {

    constructor(private http: HttpClient){

    }

    gePrecos(): Observable<Precos[]> {
        return this.http.get<Precos[]>('https://economizamais.herokuapp.com/precos');
    }
}