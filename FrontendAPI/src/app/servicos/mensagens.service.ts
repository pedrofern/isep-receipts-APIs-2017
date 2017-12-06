import { Injectable } from '@angular/core';

@Injectable()
export class MensagensService {
 mensagens: string[] = [];

 add(mensagem: string) {
   this.mensagens.push(mensagem);
 }

 clear() {
   this.mensagens = [];
 }
}