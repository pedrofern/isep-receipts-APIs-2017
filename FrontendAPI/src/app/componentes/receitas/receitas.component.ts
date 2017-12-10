import { Component, OnInit } from '@angular/core';
import { Receita } from '../../models/receita';
import { ReceitasService } from '../../servicos/receitas.service';
import { AutenticacaoService } from '../../servicos/autenticacao.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';


@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.css']
})

export class ReceitasComponent implements OnInit {
  receitas: Receita[] = [];
  receitaSelec: Receita;
  error: any;
  userInfo: User;
  encontrada: boolean;

  constructor(
    private route: Router,
    private autenticacaoService: AutenticacaoService,
    private receitaService: ReceitasService) { }

  ngOnInit() {
    this.userInfo = this.autenticacaoService.userInfo;
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
      receita => { this.receitaSelec = receita},
      error => { this.error = <any>error },
    )
    if(!this.error)this.encontrada=true;
  }

  seleccionarReceita(receita: Receita): void {

    this.receitaService.getReceita(receita._id).subscribe(

      receita => {
        this.receitaSelec = receita
      },
      error => { this.error = <any>error },
    )
    if(!this.error)this.encontrada=true;
  }

  ver(): void {
    this.route.navigate(['/receita', this.receitaSelec._id]);

  }
}