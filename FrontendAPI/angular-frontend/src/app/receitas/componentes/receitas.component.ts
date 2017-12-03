import { Component, OnInit } from '@angular/core';
import {Receita} from '../models/receita';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.css']
})
export class ReceitasComponent implements OnInit {
 
  receita: Receita = {
    id: 1,
    name: 'ReceitaTeste'
  };

  constructor() { }

  ngOnInit() {
  }

}
