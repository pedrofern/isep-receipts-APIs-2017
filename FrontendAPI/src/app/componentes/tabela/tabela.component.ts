import { Component, OnInit } from '@angular/core';
import {Receita} from '../../models/receita';
import {ReceitaService} from '../../servicos/receita.service'


@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {
  receitas: Receita[]=[];

  constructor(private receitaService: ReceitaService) { }

  ngOnInit() {
    this.getReceitas();
  }

  getReceitas(): void {
    this.receitaService.getReceitas()
      .subscribe(receitas => this.receitas = receitas.slice(1, 5));
  }

}
