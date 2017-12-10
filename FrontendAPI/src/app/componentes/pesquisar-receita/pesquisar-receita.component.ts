import { Component, OnInit } from '@angular/core';
import {Receita} from '../../models/receita';
import { ReceitasService } from '../../servicos/receitas.service';
import { AutenticacaoService } from '../../servicos/autenticacao.service';
import { ReceitasComponent } from '../receitas/receitas.component';

@Component({
  selector: 'app-pesquisar-receita',
  templateUrl: './pesquisar-receita.component.html',
  styleUrls: ['./pesquisar-receita.component.css']
})
export class PesquisarReceitaComponent implements OnInit {

  receitas: Receita[] = [];
  receitaPesquisa: Receita;
  error: any;
  encontrada: boolean;

  constructor(
    private autenticacaoService: AutenticacaoService,
    private receitaService: ReceitasService) { }

  ngOnInit() {
    this.encontrada=false;
    this.getReceitas();
  }

  getReceitas(): void {
    this.receitaService.getReceitas()
      .subscribe(receitas => {
        this.receitas = receitas;
      })
      
  }

  pesquisarReceita(codigo: string): void{
    this.receitaService.getReceita(codigo).subscribe(  
      receita => { this.receitaPesquisa = receita},
      error => { this.error = <any>error },
    )
    if(!this.error){
      this.encontrada=true;
    }
  }
}