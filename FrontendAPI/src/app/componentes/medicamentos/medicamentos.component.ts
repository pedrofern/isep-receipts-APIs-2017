import { Component, OnInit } from '@angular/core';
import {Medicamento} from '../../models/medicamento';
import {MedicamentosService} from '../../servicos/medicamentos.service';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})


export class MedicamentosComponent implements OnInit {

  medicamentos: Medicamento[]=[];

   constructor(private medicamentoService: MedicamentosService) { }
 n

  ngOnInit() {
    this.medicamentoService.getMedicamentos().subscribe(medicamentos=>{
      this.medicamentos=medicamentos;
    })
  }

}
