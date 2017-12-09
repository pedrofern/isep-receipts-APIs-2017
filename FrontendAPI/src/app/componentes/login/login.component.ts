import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../../servicos/autenticacao.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AutenticacaoService) { }
  
    ngOnInit() {
    this.authenticationService.logout();
    this.activatedRoute.params.subscribe(params => {
      if (params['u'] !== undefined) {
        ;
        this.error = 'Não tem permissões.';
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
          this.router.navigate(['/receitas']);
        } else {
          this.error = 'Username ou password incorreta';
        }
      });
  }
}