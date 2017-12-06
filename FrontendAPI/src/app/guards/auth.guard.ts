import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AutenticacaoService } from '../servicos/autenticacao.service';

@Injectable()
export class AuthGuard implements CanActivate {
 constructor(
 private router: Router,
 private authenticationService: AutenticacaoService
 ) { }
 
 canActivate() {
 if(this.authenticationService.userInfo){
 const date = new Date(0);

date.setUTCSeconds(this.authenticationService.userInfo.tokenExp);
 if(date !== undefined)
 if(date.valueOf() > new Date().valueOf())
 return true;
 }

 this.router.navigate(['/login']);
 return false;
 }
}