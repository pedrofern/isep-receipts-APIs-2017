import { Component, OnInit } from '@angular/core';
import { Receita } from '../../models/receita';
import { ReceitasService } from '../../servicos/receitas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.css']
})

export class ReceitasComponent implements OnInit {
  receitas: Receita[] = [];
  receitaSelec: Receita;
  error: any;

  constructor(
    private route: Router,
    private receitaService: ReceitasService) { }

  ngOnInit() {
    this.getReceitas();
  }

  getReceitas(): void {
    this.receitaService.getReceitas()
      .subscribe(receitas => {
        this.receitas = receitas;
      })
  }

  seleccionarReceita(receita:Receita): void{
   
    this.receitaService.getReceita(receita._id).subscribe(
      
      receita=>{
      this.receitaSelec=receita
      },
      error=> {this.error=<any>error} ,
    )
    }

    ver():void{
        
       this.route.navigate(['/receita', this.receitaSelec._id]);
    
    }
}