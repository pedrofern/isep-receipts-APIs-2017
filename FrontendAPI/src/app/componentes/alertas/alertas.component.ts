import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import{AlertasService} from '../../servicos/alertas.service';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  alerta="";

  constructor(private alertasService: AlertasService) { }

  ngOnInit() {
    
    this.alertasService.obterAlertas().subscribe(result => {
        if (result === true) {
          this.alerta=result;

        } else {
          this.alerta="Sem alertas."
        }
      });


    )
  }

}
