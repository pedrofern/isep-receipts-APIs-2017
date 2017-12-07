import { Component, OnInit } from '@angular/core';
import {Receita} from '../../models/receita';
import {ReceitaService} from '../../servicos/receita.service';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.css']
})
export class ReceitasComponent implements OnInit {

  receitas: Receita[]=[];

  constructor(private receitaService: ReceitaService) { }

  ngOnInit() {
    
    this.receitaService.getReceitas()
    .subscribe(receitas => {
    this.receitas = receitas;
    })
  }

  
  getReceitas(): void {
     //espera que o observable emita o vetor de heroes e depois subscreve para o callback,
    //que, por seua vez, define a componente heroes corretamente
    this.receitaService.getReceitas().subscribe(receitas=> this.receitas=receitas);
  }  

  add(utente: string, medico:string, prescricoes: string): void {
    prescricoes = prescricoes.trim();
    if (!prescricoes) { return; }
    this.receitaService.addReceita({utente, medico, prescricoes} as Receita)
      .subscribe(receita => {
        this.receitas.push(receita);
      });
  }

  /*
  delete(receita: Receita): void {
    this.receitas = this.receitas.filter(r => r !== receita);
    this.receitaService.deleteReceita(receita).subscribe();
  }*/
}
