import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { LocalUser } from '../model/local-user.model';
import { StorageService } from '../services/storage.service';
//import { JwtHelper } from 'angular2-jwt';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{

   
    loginForm: FormGroup;
    loading = false;
    //jwrHelper: JwtHelper = new JwtHelper();

    constructor(
        private formBuilder: FormBuilder, 
        private authService: AuthService,
        private router: Router,
        private storage: StorageService
    ){

    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login(){
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;
        this.loading = true;
        this.authService.authenticate(userName, password)
            .subscribe(res => {
               
                //console.log(res.headers.get('Authorization')); 
                let token = res.headers.get('Authorization').substring(7);
                let user : LocalUser = {
                        token: token,
                        email: 'teste',
                        jti: '1'
                };
                this.storage.setLocalUser(user);
               //this.router.navigateByUrl('cadastro');
                this.loading = false;
                this.router.navigate(['cadastro'])
            }, err => {
                console.log(err);
                this.loading = false;
                this.loginForm.reset();
            })
    }
}