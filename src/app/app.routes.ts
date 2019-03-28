import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModuleWithProviders } from '@angular/core';
import { ProdutosComponent } from './cadastro-prod/produtos/produtos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LixeiraComponent } from './lixeira/lixeira.component';
import { CadastroUserComponent } from './cadastro-user/cadastro-user.component';

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'cadastro', component: ProdutosComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'lixeira', component: LixeiraComponent},
    {path: 'new-cadastro', component: CadastroUserComponent}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);