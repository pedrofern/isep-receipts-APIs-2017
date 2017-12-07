import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Receita} from '../models/receita';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

//quando acedemos de servidor remoto, é preciso captar os erros sobre
//http.get()
import { catchError, map, tap } from 'rxjs/operators';

import { MensagensService } from '../servicos/mensagens.service';
import { AutenticacaoService } from '../servicos/autenticacao.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ReceitaService {

    //pos-async
  private receitasUrl= 'http://localhost:8080/receita';

 //private receitasUrl=  'http://receitas2017.azurewebsites.net/receita';
    //o angular vai injetar o singleton MessageService nesta propriedade
  //quando cria o HeroService -> "Service-in-service"
 constructor(
   private mensagensService: MensagensService,
  private http: HttpClient,
  private autenticacaoService:AutenticacaoService
) { }

  /** GET receitas from the server */
  getReceitas (): Observable<Receita[]> {

      //metodo pipe para o uso de CatchError e aplicado ao observable
   /* return this.http.get<Receita[]>(this.receitasUrl)
      .pipe(
        tap(receitas => this.log(`receitas fetched`)),
        catchError(this.handleError('getReceitas', []))
      );
      */

      return this.http.get<Receita[]>(this.receitasUrl,
        this.getHeaders());
      }

      getHeaders(){
        let headers = new HttpHeaders({'x-access-token':
       this.autenticacaoService.userInfo.token });
       
        let httpOptions = {
        headers: headers
        };
        return httpOptions;
        }
  
 
  /** GET hero by id. Return `undefined` when id not found */
  getReceitaNo404<Data>(id: number): Observable<{}|Receita> {
    const url = `${this.receitasUrl}/?id=${id}`;
    return this.http.get<Receita[]>(url)
      .pipe(
        map(receitas => receitas[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} receita id=${id}`);
        }),
        catchError(this.handleError<Receita>(`getReceita id=${id}`))
      );
  }
 
  /** GET hero by id. Will 404 if id not found */
  getReceita(id: number): Observable<{}|Receita> {
    const url = `${this.receitasUrl}/${id}`;
    return this.http.get<Receita>(url).pipe(
      tap(_ => this.log(`fetched receita id=${id}`)),
      catchError(this.handleError<Receita>(`getReceita id=${id}`))
    );
  }
 
  /* GET receitas whose name contains search term */
  searchReceitas(term: string): Observable<Receita[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Receita[]>(`api/receitas/?name=${term}`).pipe(
      tap(_ => this.log(`found receitas matching "${term}"`)),
      catchError(this.handleError<Receita[]>('searchReceitas', []))
    );
  }
 
  //////// Save methods //////////
 
  /** POST: add a new hero to the server */
  //this.receitaService.addReceita({utente, medico, prescricoes} as Receita)
  addReceita (receita: Receita): Observable<Receita> {
    return this.http.post<Receita>(this.receitasUrl, receita, httpOptions).pipe(
      tap((receita: Receita) => this.log(`adicionada receita c/ id=${receita._id}`)),
      catchError(this.handleError<Receita>('addReceita'))
    );
  }
 
  /** DELETE: delete the hero from the server */
  deleteReceita (receita: Receita | number): Observable<Receita> {
    const id = typeof receita === 'number' ? receita : receita._id
    const url = `${this.receitasUrl}/${id}`;
 
    return this.http.delete<Receita>(url, httpOptions).pipe(
      tap(_ => this.log(`receita removida id=${id}`)),
      catchError(this.handleError<Receita>('deleteReceita'))
    );
  }
 
  /** PUT: update the hero on the server */
  updateReceita (receita: Receita): Observable<any> {
    return this.http.put(this.receitasUrl, receita, httpOptions).pipe(
      tap(_ => this.log(`updated receita id=${receita._id}`)),
      catchError(this.handleError<any>('updateReceita'))
    );
  }
 
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a ReceitaService message with the MensagensService */
   //Cm e chamado muitas vezes, é colocado num metodo
  private log(mensagem: string) {
    this.mensagensService.add('MensagensService: ' + mensagem);
  }
}
