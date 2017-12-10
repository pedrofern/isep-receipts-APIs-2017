import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { AutenticacaoService } from '../servicos/autenticacao.service';
import {Alerta} from '../models/alerta';

@Injectable()
export class AlertasService {

 //private receitasUrl = 'http://receitas2017.azurewebsites.net/receita/';
 private alertaUrl='http://localhost:8080/utente/5a26c4460017e11264d5d547/expirando';
  //private receitasUrl = 'http://localhost:8080/receita/';
  //verificar o servidor:porta
 
  constructor(
   private http: HttpClient,
   private authenticationService: AutenticacaoService) { }
   
   obterAlertas(): Observable<Alerta[]> {
     if(this.authenticationService.userInfo.utente){

       this.alertaUrl= 'http://receitas2017.azurewebsites.net/utente/' + this.authenticationService.userInfo.id + '/expirando';
        return this.http.get<Alerta[]>(this.alertaUrl,
        this.getHeaders());
     }
   }
   
   getHeaders(){
      let headers = new HttpHeaders({'x-access-token':
      this.authenticationService.userInfo.token });
      
      let httpOptions = {
      headers: headers
      };
      return httpOptions;
   }
  }