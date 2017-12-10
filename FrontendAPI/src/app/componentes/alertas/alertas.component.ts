import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import{AlertasService} from '../../servicos/alertas.service';
import {AutenticacaoService} from '../../servicos/autenticacao.service';

import {User} from '../../models/user';
import {Alerta} from '../../models/alerta';


@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})

export class AlertasComponent implements OnInit {

  alertas:Alerta[];
  userInfo: User;
  abre:boolean;
  
  constructor(private alertasService: AlertasService, private autenticacaoService: AutenticacaoService) { }

  ngOnInit() {
    this.atualizar();
  }
  
  atualizar(){
    this.userInfo= this.autenticacaoService.userInfo;
    if(this.userInfo){
      this.alertasService.obterAlertas().subscribe(result => {
        if (result) {
         this.alertas=result;
         this.abre=true;
        }else{
          this.abre=false;
        }
      });
    }
  }

}
