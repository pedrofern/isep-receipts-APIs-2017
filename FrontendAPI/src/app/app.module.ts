import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';

//Componentes
import { AppComponent } from './app.component';

//Servicos
import {AutenticacaoService} from './servicos/autenticacao.service';
import {ReceitasService} from './servicos/receitas.service';
import {MedicamentosService} from './servicos/medicamentos.service';

//Autententicacao
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MedicoGuard } from './guards/medico.guard';
import { FarmaceuticoGuard } from './guards/farmaceutico.guard';
import { UtenteGuard } from './guards/utente.guard';
import { RegisteredGuard } from './guards/registeredGuard';

import { ReceitasComponent } from './componentes/receitas/receitas.component';
import { MedicamentosComponent } from './componentes/medicamentos/medicamentos.component';
import { DetalheReceitaComponent } from './componentes/detalhe-receita/detalhe-receita.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,  
    LoginComponent, 
    ReceitasComponent, 
    MedicamentosComponent, 
    DetalheReceitaComponent
  ],
  providers: [
    //Autenticacao
    AuthGuard,
    MedicoGuard,
    FarmaceuticoGuard,
    UtenteGuard,
    RegisteredGuard,
    //Servicos
    AutenticacaoService,
    ReceitasService,
    MedicamentosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
