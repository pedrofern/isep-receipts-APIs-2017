import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HttpClientModule} from '@angular/common/http';
import { HttpClient } from 'selenium-webdriver/http';

//AUTENTICACAO
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MedicoGuard } from './guards/medico.guard';
import { FarmaceuticoGuard } from './guards/farmaceutico.guard';
import { UtenteGuard } from './guards/utente.guard';

import { ReceitasComponent} from './componentes/receitas/receitas.component';
import { MedicamentosComponent} from './componentes/medicamentos/medicamentos.component';
import { DetalheReceitaComponent} from './componentes/detalhe-receita/detalhe-receita.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //RECEITAS PRECISAM DE LOGIN
  { path: 'receitas', component: ReceitasComponent, canActivate:
  [AuthGuard, MedicoGuard] },
  {path: 'receita/:_id', component: DetalheReceitaComponent,  canActivate:
  [AuthGuard, MedicoGuard]  },
  { path: 'medicamentos', component: MedicamentosComponent },  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), HttpClientModule ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
 