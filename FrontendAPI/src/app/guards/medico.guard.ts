import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AutenticacaoService } from '../servicos/autenticacao.service';

@Injectable()
export class MedicoGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AutenticacaoService
    ) { }

    canActivate() {
        if (this.authenticationService.userInfo)
            if (this.authenticationService.userInfo.medico)
                return true;
        this.router.navigate(['/login', { u: 'no' }]);
        return false;
    }
}