import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Medicamento } from '../models/medicamento';
import { AutenticacaoService } from './autenticacao.service';

@Injectable()
export class MedicamentosService {

 private medicamentosUrl = 'http://medicamentosapi2017.azurewebsites.net/api/medicamento';
 //private medicamentosUrl = 'http://localhost:50647/api/medicamento';
  
  //verificar o servidor:porta

  constructor(
    private http: HttpClient,
    private authenticationService: AutenticacaoService) { }

  getMedicamentos(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(this.medicamentosUrl,
    this.getHeaders());
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