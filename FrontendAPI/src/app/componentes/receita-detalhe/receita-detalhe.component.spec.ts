import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
 
import { Receita }         from '../../models/receita';
import { ReceitaService }  from '../../servicos/receita.service';
 
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
    this.getReceita();
  }
 
  getRceita(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.receitaService.getReceita(id)
      .subscribe(receita => this.receita = receita);
  }
 
  goBack(): void {
    this.location.back();
  }
}