import { Component, OnInit } from '@angular/core';
import {Apresentacao} from '../../models/apresentacao';
import {MedicamentosService} from '../../servicos/medicamentos.service';
import {AutenticacaoService} from '../../servicos/autenticacao.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-criacao-receita',
  templateUrl: './criacao-receita.component.html',
  styleUrls: ['./criacao-receita.component.css']
})
export class CriacaoReceitaComponent implements OnInit {

  apresentacoes: Apresentacao[]=[];
  idsApSelec:string[]=[];
  apresentacaoSelec: Apresentacao;
  erro:any;
  userInfo:User;

  constructor(
    private autenticacaoService:AutenticacaoService,
    private medicamentoService:MedicamentosService) { }

  ngOnInit() {
    this.userInfo=this.autenticacaoService.userInfo;
    this.getApresentacoes();
  }

  getApresentacoes(): void{
     this.medicamentoService.getApresentacoes().subscribe(
       apresentacoes=>{ this.apresentacoes=apresentacoes},
       error=> {this.erro=<any>error},
    )
  }

  seleccionarApresentacao(apres:Apresentacao):void{
      this.apresentacaoSelec=apres;
      this.idsApSelec.push((this.apresentacaoSelec.id).toString());
  }

  removeApresentacao(apres:string):void{
      var index=this.idsApSelec.indexOf(apres);
      if(index>=0)
        this.idsApSelec.splice(index,1);

  }
}
