import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs';
import { UserCriado } from '../models/userCriado';
import {User} from '../models/user';

@Injectable()
export class RegistoService {

 private registoUrl ='http://receitas2017.azurewebsites.net/pessoas';
 //private registoUrl = 'http://localhost:8080/pessoas';
 private user:UserCriado;
 userCriado: Subject<UserCriado>=new Subject<UserCriado>();
 criado:boolean;
  //verificar o servidor:porta

  constructor(     private http: HttpClient ) { }

  get(){
    return this.http.get<User[]>(this.registoUrl,
      this.getHeaders());
  }

  registar(nome: string,nif :string,num_beneficiario:string, email:string, password:string){
    
    return new Observable<UserCriado>(observer=>{
      return this.http.post<UserCriado>(this.registoUrl, {
          nome:nome,
          nif:nif,
          email:email,
          password:password,
          num_beneficiario:num_beneficiario,
          
        }, this.getHeaders()).subscribe(data=>{

          if(data.nif){

            this.user={
              nif:data.nif,
              nome:data.nome,
              email:data.email,
              password:data.password,
              num_beneficiario:data.num_beneficiario,
              farmaceutico:false,
              medico:false,
              utente:true
            },
            localStorage.user=this.user;

            this.userCriado.next(this.user);
            observer.next(this.user);
            this.criado=true;
          }else{
            this.userCriado.next(this.user);
            observer.next(null);
            this.criado=false;
          }
        },(err: HttpErrorResponse)=> {
          if(err.error instanceof Error){
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
          console.log(err);
          this.userCriado.next(this.user);
          observer.next(null);
          this.criado=false;
          });
        });
  }

  getHeaders() {
    let headers = new HttpHeaders({
    });

    let httpOptions = {
      headers: headers
    };
    return httpOptions;
  }
}