import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
 
import { Receita }         from '../../models/receita';
import { ReceitaService }  from '../../servicos/receita.service';
 
//pos async
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-receita-detalhe',
  templateUrl: './receita-detalhe.component.html',
  styleUrls: [ './receita-detalhe.component.css' ]
})
export class ReceitaDetalheComponent implements OnInit {
  @Input() receita: Receita;
 
  constructor(
    private route: ActivatedRoute,
    private receitaService: ReceitaService,
    private location: Location
  ) {}
 
  ngOnInit(): void {
  //  this.getReceita();
  }
 
  /*
  getReceita(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.receitaService.getReceita(id)
      .subscribe(receita => this.receita = receita);
    }
 
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.receitaService.updateReceita(this.receita)
      .subscribe(() => this.goBack());
  }

*/
}