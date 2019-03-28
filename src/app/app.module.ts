import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskService } from './task-list/task.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { routes } from './app.routes';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProdutosComponent } from './cadastro-prod/produtos/produtos.component';
import { ProdutosService } from './cadastro-prod/produtos/produtos.service';
import { AvatarModule } from 'ngx-avatar';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StorageService } from './services/storage.service';
import { PrecosService } from './cadastro-prod/produtos/precos.service';
import { CadastroUserComponent } from './cadastro-user/cadastro-user.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LixeiraComponent } from './lixeira/lixeira.component';
import { CadastroUserService } from './cadastro-user/cadastro-user.service';


@NgModule({
  declarations: [
    AppComponent,
    LixeiraComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    ProdutosComponent,
    PerfilComponent,
    CadastroUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    AvatarModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#f96332', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'
    }),
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  providers: [TaskService, ProdutosService, StorageService, PrecosService, CadastroUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
