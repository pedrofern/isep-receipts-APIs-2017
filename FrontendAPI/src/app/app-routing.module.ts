import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HttpClientModule} from '@angular/common/http';
import { HttpClient } from 'selenium-webdriver/http';

import { ReceitasComponent }      from './componentes/receitas/receitas.component';
import {ReceitaDetalheComponent}  from './componentes/receita-detalhe/receita-detalhe.component';
import {TabelaComponent} from './componentes/tabela/tabela.component';

//AUTENTICACAO
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MedicoGuard } from './guards/medico.guard';
import { FarmaceuticoGuard } from './guards/farmaceutico.guard';
import { UtenteGuard } from './guards/utente.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'tabela', component: TabelaComponent },
  { path: 'detalhe/:id', component: ReceitaDetalheComponent },
  { path: 'login', component: LoginComponent },
  //RECEITAS PRECISAM DE LOGIN
  { path: 'receitas', component: ReceitasComponent, canActivate:
  [AuthGuard, MedicoGuard, FarmaceuticoGuard, UtenteGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), HttpClientModule ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }