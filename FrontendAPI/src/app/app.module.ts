import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';

//Componentes
import { AppComponent } from './app.component';
import { ReceitasComponent } from './componentes/receitas/receitas.component';
import { ReceitaUpdateComponent } from './componentes/receita-update/receita-update.component';
import { RECEITAS} from './testes/mock-receitas';
import { ReceitaDetalheComponent } from './componentes/receita-detalhe/receita-detalhe.component';
import { MensagensComponent } from './componentes/mensagens/mensagens.component';
import { TabelaComponent } from './componentes/tabela/tabela.component';
import { MedicPesquisaComponent} from './componentes/medic-pesquisa/medic-pesquisa.component';

//Servicos
import { MensagensService } from './servicos/mensagens.service';
import { ReceitaService } from './servicos/receita.service';
import {AutenticacaoService} from './servicos/autenticacao.service';

//Autententicacao
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MedicoGuard } from './guards/medico.guard';
import { FarmaceuticoGuard } from './guards/farmaceutico.guard';
import { UtenteGuard } from './guards/utente.guard';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    ReceitasComponent,
    ReceitaUpdateComponent,
    ReceitaDetalheComponent,
    MensagensComponent,
    TabelaComponent,
    MedicPesquisaComponent,
    LoginComponent
  ],
  providers: [
    //Autenticacao
    AuthGuard,
    MedicoGuard,
    FarmaceuticoGuard,
    UtenteGuard,
    //Servicos
    AutenticacaoService,
    ReceitaService, MensagensService],
  bootstrap: [AppComponent]
})
export class AppModule { }
