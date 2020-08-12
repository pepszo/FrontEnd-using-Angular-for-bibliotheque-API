import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_ROLE = 'auth-role';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, 'Bearer ' + token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(username: string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, username);
  }

  public getUser(): string {
    return (sessionStorage.getItem(USER_KEY));
  }


  public saveRole(role: string): void {
    window.sessionStorage.removeItem(USER_ROLE);
    window.sessionStorage.setItem(USER_ROLE, role);
  }

  public getRole(): string {
    return (sessionStorage.getItem(USER_ROLE));
  }
}
