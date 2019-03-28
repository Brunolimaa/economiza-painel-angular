import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
    selector: 'footer-app',
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    login: boolean = false;

    constructor(private storage: StorageService){
        if(storage.getLocalUser().token != ""){
            this.login = true;
        }
    }
}