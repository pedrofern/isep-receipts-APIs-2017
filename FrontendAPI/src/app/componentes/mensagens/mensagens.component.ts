import { Component, OnInit } from '@angular/core';
import { MensagensService } from '../../servicos/mensagens.service';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent implements OnInit {

  constructor(public mensagensService: MensagensService) { }

  ngOnInit() {
  }

}
