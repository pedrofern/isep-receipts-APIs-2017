import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Receita } from '../../models/receita';
import { ReceitasService } from '../../servicos/receitas.service';



@Component({
  selector: 'app-detalhe-receita',
  templateUrl: './detalhe-receita.component.html',
  styleUrls: ['./detalhe-receita.component.css']
})
export class DetalheReceitaComponent implements OnInit {

  @Input() receita: Receita;
  @Output() close = new EventEmitter();
  error: any;
  selectId: string;
  navigated =false; // true if navigated here

  constructor(

    private receitaService: ReceitasService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.route.params.forEach((params: Params) => {
      if (params['_id'] !== undefined) {
        this.navigated = true;
        this.getReceita(params['_id']);
        
      } else {
        this.navigated = false;
        this.receita = new Receita();
      }
    });
  }
  
  getReceita(id : string) : void{    
    this.receitaService.getReceita(id).subscribe(receita => this.receita = receita);
  }

    voltar(): void {
      this.close.emit(this.receita);
      if(this.navigated) { window.history.back(); }

           //this.location.back();
    }

  }
