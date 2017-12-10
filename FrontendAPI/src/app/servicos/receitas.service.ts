import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Receita } from '../models/receita';
import {ReceitaAviada} from '../models/receitaAviada';
import { Aviamento}from '../models/aviamento';
import {Apresentacao} from '../models/apresentacao';
import { AutenticacaoService } from '../servicos/autenticacao.service';
import { Subject } from 'rxjs';

@Injectable()
export class ReceitasService {

  private receitaEscolhida:Receita;
  private receita:Receita;
  private receitaAviada: ReceitaAviada;
  receitaCriada: Subject<Receita>=new Subject<Receita>(); 
  receitaSubAviada: Subject<ReceitaAviada>=new Subject<ReceitaAviada>();  

 private receitasUrl = 'http://receitas2017.azurewebsites.net/receita/';
 /*private aviarUrl=
  'http://receitas2017.azurewebsites.net/receita/5a26cb6d75dcb207b46b94da/prescricao/5a26e47341ce761558f366ac/aviar';*/

  private aviarUrl=
  'http://localhost:8080/receita/5a26cb6d75dcb207b46b94da/prescricao/5a26e47341ce761558f366ac/aviar';

  //private receitasUrl = 'http://localhost:8080/receita/';
  //verificar o servidor:porta
 
  constructor(
   private http: HttpClient,
   private authenticationService: AutenticacaoService) { }
   
   getReceitas(): Observable<Receita[]> {
      return this.http.get<Receita[]>(this.receitasUrl,
      this.getHeaders());
   }

   getReceita(id:string ): Observable<Receita>{
     var url=this.receitasUrl+'/'+id;
     return this.http.get<Receita>(url, this.getHeaders());
   }

   aviarReceita(idPresc:string,aviamentos:Aviamento[], receita:string): Observable<ReceitaAviada>{
   // 'http://localhost:8080/receita/5a26cb6d75dcb207b46b94da/prescricao/5a26e47341ce761558f366ac/aviar';

    this.aviarUrl='http://localhost:8080/receita/' + receita + '/prescricao/' + idPresc + '/aviar';

    return new Observable<ReceitaAviada>(observer => {
      this.http.put<ReceitaAviada>(this.aviarUrl, {
         receitaAviada:{
           aviamentos:aviamentos,
         }
      }, this.getHeaders()).subscribe(data=>{

          this.receitaAviada={
            aviamentos:data.aviamentos,
          }
            
          localStorage.receita=this.receitaAviada;

          this.receitaSubAviada.next(this.receitaAviada);
          observer.next(this.receitaAviada);
  
      }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
          console.log(err);
          this.receitaSubAviada.next(this.receitaAviada);
          observer.next(null);
        });

    });
  
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