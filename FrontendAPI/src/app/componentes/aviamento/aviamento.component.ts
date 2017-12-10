import { Component, OnInit } from '@angular/core';
import { Receita } from '../../models/receita';
import { ReceitaAviada } from '../../models/receitaAviada';
import { ReceitasService } from '../../servicos/receitas.service';
import { AutenticacaoService } from '../../servicos/autenticacao.service';
import { Aviamento } from '../../models/aviamento';

@Component({
  selector: 'app-aviamento',
  templateUrl: './aviamento.component.html',
  styleUrls: ['./aviamento.component.css']
})
export class AviamentoComponent implements OnInit {

  receitaSelec: Receita;
  receitaAviada: ReceitaAviada;
  error: any;
  encontrada: boolean;
  qtdd: number;
  presc: string;
  aviamento: Aviamento;
  aviamentos: Aviamento[]=[];

  constructor(
    private receitaService: ReceitasService,
    private autenticacaoService: AutenticacaoService) { }

  ngOnInit() {
    this.encontrada = false;

  }

  pesquisarReceita(codigo: string): void {
    this.receitaService.getReceita(codigo).subscribe(
      receita => { this.receitaSelec = receita },
      error => { this.error = <any>error },
    )
    if (!this.error) this.encontrada = true;
  }

  adicionarAviamento(qtdd: number, data: Date) {
    this.aviamento = {
      data_aviamento: data,
      quantidade: qtdd,
      farmaceutico: this.autenticacaoService.userInfo.id
    }
    this.aviamentos.push(this.aviamento);
  }

  aviar(idPresc: string) {

    this.receitaService.aviarReceita(idPresc, this.aviamentos, this.receitaSelec._id).subscribe(
      receita => { this.receitaAviada = receita },
      error => { this.error = <any>error },
    )
  }
}
