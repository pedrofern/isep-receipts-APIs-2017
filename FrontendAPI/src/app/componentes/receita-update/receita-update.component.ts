import { Component, OnInit } from '@angular/core';
import {Receita} from '../../models/receita';

@Component({
  selector: 'app-receita-update',
  templateUrl: './receita-update.component.html',
  styleUrls: ['./receita-update.component.css']
})
export class ReceitaUpdateComponent implements OnInit {

  receita: Receita = {
    _id:"1",
    utente: "utenteTeste",
    medico: "medicoTeste",
    __v: "0", 
    prescricoes:"teste"

  };

  constructor() { }

  ngOnInit() {
  }

}

