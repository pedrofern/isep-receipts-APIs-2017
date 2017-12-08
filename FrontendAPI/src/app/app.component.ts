import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AutenticacaoService } from './servicos/autenticacao.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Angular - UI';
  subscriptionAuth: Subscription;
  userInfo: User;

  constructor(
    private authenticationService: AutenticacaoService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.userInfo = this.authenticationService.userInfo;
    this.subscriptionAuth =
      this.authenticationService.authentication.subscribe((userInfo) => {
        this.userInfo = userInfo;
        this.cdr.detectChanges();
      });
  }
  
  ngOnDestroy() {
    this.subscriptionAuth.unsubscribe();
  }
}