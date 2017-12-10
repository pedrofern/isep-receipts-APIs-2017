import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AutenticacaoService } from '../servicos/autenticacao.service';

@Injectable()
export class RegisteredGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AutenticacaoService
    ) { }

    canActivate() {
        if (this.authenticationService.userInfo)
            if (this.authenticationService.userInfo.medico ||
                 this.authenticationService.userInfo.farmaceutico ||
                this.authenticationService.userInfo.utente)
                return true;
        this.router.navigate(['/login', { u: 'no' }]);
        return false;
    }
}