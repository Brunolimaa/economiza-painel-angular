import { Component } from '@angular/core';
import { Loja } from '../model/loja.model';
import { CadastroUserService } from './cadastro-user.service';
import swal from 'sweetalert2';

@Component({
    selector: 'cadastro-user',
    templateUrl: './cadastro-user.component.html'
})
export class CadastroUserComponent {

    loja: Loja = new Loja();

    constructor(private service: CadastroUserService){

    }

    cadastrar(){
        this.service.cadastrarUsers('lojas', this.loja)
            .subscribe(res => {
                swal({
                    title: 'Cadastrado!',
                    text: 'Dentro de alguns minutos voce recebarar um email com a senha.',
                    type: 'success',
                    confirmButtonText: 'Ok'
                  })
                console.log('Cadastrado com sucesso!');
            })
        console.log(this.loja);
    }

}