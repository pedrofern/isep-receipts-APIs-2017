import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs';
import { ReceitaCriada } from '../models/receitaCriada';
import {Apresentacao} from '../models/apresentacao';
import { AutenticacaoService } from '../servicos/autenticacao.service';

@Injectable()
export class FabReceitasService {

 private receitasUrl = 'http://receitas2017.azurewebsites.net/receita/';
 private receita:ReceitaCriada;
 receitaCriada: Subject<ReceitaCriada>=new Subject<ReceitaCriada>();

  constructor(
   private http: HttpClient,
   private authenticationService: AutenticacaoService) { }
   
   criarReceita(utente:string, prescricoes:any, medico:string, local:string, data:Date): Observable<ReceitaCriada> {
    
    return new Observable<ReceitaCriada>(observer => {
      this.http.post<ReceitaCriada>(this.receitasUrl, {
          utente:utente,
          medico:medico,
          local:local,
          data:data,
          prescricoes:prescricoes
      }, this.getHeaders()).subscribe(data=>{

        if(data.utente && data.local && data.prescricoes){
          this.receita={
            utente: data.utente,
            medico:  data.medico,
            local: data.local,
            data:  data.data,
            prescricoes: data.prescricoes       
          },
          localStorage.receita=this.receita;

          this.receitaCriada.next(this.receita);
          observer.next(this.receita);
      }else{
        this.receitaCriada.next(this.receita);
        observer.next(null);
      }
      }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
          console.log(err);
          this.receitaCriada.next(this.receita);
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