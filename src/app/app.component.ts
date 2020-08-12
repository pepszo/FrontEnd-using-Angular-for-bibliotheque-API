import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenStorageService} from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'bibliotheque_frontend';
  role: string;
  isLoggedIn = false;
  showBibliothecaireBoard = false;
  showManagerBoard = false;
  showManagerGeneralBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = this.tokenStorageService.getRole();
      this.showBibliothecaireBoard = this.role.includes('ROLE_BIBLIOTHECAIRE');

      if (this.role === 'ROLE_MANAGER') {
        this.showManagerBoard = true;
        this.showBibliothecaireBoard = true;
      }

      if (this.role === 'ROLE_MANAGER GENERAL') {
        this.showManagerBoard = true;
        this.showBibliothecaireBoard = true;
        this.showManagerGeneralBoard = true;
      }

      if (this.role === 'ROLE_BIBLIOTHECAIRE') {
        this.showBibliothecaireBoard = true;
      }
      this.username = user;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
