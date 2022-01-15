import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message/message.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User | null;

  redirectUrl: string;
  get isLoggedIn() {
    return !!this.currentUser;
  }
  constructor(private messageService: MessageService,
    private router: Router) {
    this.currentUser = null;
    this.redirectUrl = '';
  }

  login(userName: string, password: string): void {
    if (!userName || !password) {
      this.messageService.addMessage('Please enter your user name and password');
      return;
    }

    const nagivationUrl = this.redirectUrl ? this.redirectUrl : '/products';
    if (userName === 'admin') {
      this.currentUser = {
        id: 1,
        userName: userName,
        isAdmin: true
      };
      this.messageService.addMessage('Admin logged in');
      this.router.navigate([nagivationUrl]);
      return;
    }

    if (userName !== 'green') {
      this.messageService.addMessage('Invalid credential');
      return;
    }

    this.currentUser = {
      id: 2,
      userName: userName,
      isAdmin: false
    };
    this.messageService.addMessage(`User: ${this.currentUser.userName} logged in`);
    this.router.navigate([nagivationUrl]);
    return;
  }

  logOut(): void {
    this.currentUser = null;
  }
}
