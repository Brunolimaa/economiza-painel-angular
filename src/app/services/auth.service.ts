import { Injectable } from '@angular/core'; 
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {

   
    
    
    constructor(){

    }

    //restringe acesso as rotas
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        throw new Error("Method not implemented.");
    }


}