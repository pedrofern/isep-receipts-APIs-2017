import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Medicamento } from '../models/medicamento';

@Injectable()
export class MedicamentosService {

 private medicamentosUrl = 'http://medicamentosapi2017.azurewebsites.net/api/medicamento';
//  private medicamentosUrl = 'http://localhost:5050/api/medicamento';
  //verificar o servidor:porta

  constructor(
    private http: HttpClient,
  ) {}

  
   getMedicamentos(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(this.medicamentosUrl, this.getHeaders());
  }

  getHeaders(){
    let headers = new HttpHeaders({});
   
    let httpOptions = {
      headers: headers
    };
    return httpOptions;
    }

}

