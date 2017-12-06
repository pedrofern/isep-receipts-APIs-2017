import { Component, OnInit } from '@angular/core';

//async
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';


import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Receita } from '../../models/receita';
import { ReceitaService } from '../../servicos/receita.service';


@Component({
  selector: 'app-medic-pesquisa',
  templateUrl: './medic-pesquisa.component.html',
  styleUrls: ['./medic-pesquisa.component.css']
})

export class MedicPesquisaComponent implements OnInit {
//async
receitas$: Observable<Receita[]>;
private searchTerms = new Subject<string>();

constructor(private receitaService: ReceitaService) {}
//  constructor() { } pre-async

 // Push a search term into the observable stream.
 search(term: string): void {
  this.searchTerms.next(term);
}

  ngOnInit():void {

    //pos-async

    //Observable
    /*this.receitas$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
    //  switchMap((term: string) => this.receitaService.searchReceitas(term)),
    );
    */
  }
}
