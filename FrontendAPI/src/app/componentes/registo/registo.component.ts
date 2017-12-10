import { Component, OnInit } from '@angular/core';
import { RegistoService } from '../../servicos/registo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.css']
})

export class RegistoComponent implements OnInit {
  error="";

  constructor(  private registoService: RegistoService,
    private route: Router) { }

  ngOnInit() {
  }

  registar(nome : string, inputNIF:string, inputNB:string, inputEmail4:string, inputPassword4:string): void{
    
    if(inputNIF && inputPassword4){
       this.registoService.registar(nome,inputNIF,inputNB, inputEmail4, inputPassword4).subscribe(
         result=> { if(result===null){
           this.error="Não foi possível registá-lo.";
         }else{
          this.route.navigate(['/login']);
         }
        });

    }else{
      this.error="Verifique se introduziu o NIF e a password";
    }
  

 }

}
