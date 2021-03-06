import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../../servicos/autenticacao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertasService} from '../../servicos/alertas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  logado=false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AutenticacaoService,
    private alertasService: AlertasService) { }
  
    ngOnInit() {
      this.authenticationService.logout();
      this.activatedRoute.params.subscribe(params => {
        if (params['u'] !== undefined) {
          ;
          this.error = 'Não tem permissões.';
          this.logado=false;
        }
      });
  }

  login() {
    this.loading = true;

    this.authenticationService.login(this.model.nif,
      this.model.password)
      .subscribe(result => {
        this.loading = false;
        if (result === true) {
          this.logado=true;
          this.alertasService.obterAlertas();
          this.router.navigate(['/receitas']);
        } else {
          this.logado=false;
          this.error = 'Username ou password incorreta';
        }
      });
  }
}