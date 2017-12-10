import { Component, OnInit } from '@angular/core';
import {Apresentacao} from '../../models/apresentacao';
import {FabReceitasService} from '../../servicos/fabrica-receitas.service';
import {AutenticacaoService} from '../../servicos/autenticacao.service';
import {MedicamentosService} from '../../servicos/medicamentos.service';
import {User} from '../../models/user';
import {Receita} from '../../models/receita';
import { PrescricaoCriada } from '../../models/prescricaoCriada';

@Component({
  selector: 'app-criacao-receita',
  templateUrl: './criacao-receita.component.html',
  styleUrls: ['./criacao-receita.component.css']
})
export class CriacaoReceitaComponent implements OnInit {

  model: any = {};
  apresentacoes: Apresentacao[]=[];
  idsApSelec:string[]=[];
  apresentacaoSelec: Apresentacao;
  prescricaoCriada: PrescricaoCriada;
  error:any;
  userInfo:User;
  creating = false;
  prescricoes: PrescricaoCriada[]=[];
  idApres: number;
  utente:string;
  data:Date;
  local:string;
  verForm:boolean;

  constructor(
    private autenticacaoService:AutenticacaoService,
    private medicamentoService:MedicamentosService,
    private fabReceitasService:FabReceitasService) { }

  ngOnInit() {
    this.userInfo=this.autenticacaoService.userInfo;
    this.getApresentacoes();
  }

  getApresentacoes(): void{
     this.medicamentoService.getApresentacoes().subscribe(
       apresentacoes=>{ this.apresentacoes=apresentacoes},
       error=> {this.error=<any>error},
    )
  }

  seleccionarApresentacao(apres:Apresentacao):void{
      this.apresentacaoSelec=apres;
      this.idsApSelec.push((this.apresentacaoSelec.id).toString());
  }

  removeApresentacao(apres: string, presc:PrescricaoCriada):void{
      var index=this.idsApSelec.indexOf(apres);
      if(index>=0)
        this.idsApSelec.splice(index,1);

        var i;
      for(i=0; i<this.prescricoes.length;i++){
          if( (this.prescricoes[i].apresentacao.id_apresentacao).toString()===apres){
            this.prescricoes.splice(i, 1);
          }
      }

  }

  criarPrescricao(idApres:number, qtdd:string, validade:Date){
      if(idApres && qtdd && validade){
      this.prescricaoCriada={
        quantidade:qtdd,
        validade: validade,
        apresentacao: {
          id_apresentacao:idApres
        }
      }
      this.prescricoes.push(this.prescricaoCriada);
      this.error = null;
    }else{
      this.error= "Introduza a validade e quantidade";
    }
  }

  criarReceita(utente:string, local:string, data:Date){
    var medico=(this.autenticacaoService.userInfo.nif).toString();
    this.creating = true;

    this.fabReceitasService.criarReceita(utente, this.prescricoes, medico, local, data)
      .subscribe(result => {
        this.creating = false;
        if (result !== null) {
          //TODO
        } else {
          this.error = 'Não foi possível criar a receita';
        }
      });
  }
}
