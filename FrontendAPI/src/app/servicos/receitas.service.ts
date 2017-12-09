import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Receita } from '../models/receita';
import { AutenticacaoService } from '../servicos/autenticacao.service';

@Injectable()
export class ReceitasService {

 // private receitasUrl = 'http://receitas2017.azurewebsites.net/receita/';

  private receitasUrl = 'http://localhost:8080/receita';
  //verificar o servidor:porta
 
  constructor(
   private http: HttpClient,
   private authenticationService: AutenticacaoService) { }
   
   getReceitas(): Observable<Receita[]> {
   return this.http.get<Receita[]>(this.receitasUrl,
  this.getHeaders());
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