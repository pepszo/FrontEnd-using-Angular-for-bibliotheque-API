import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {forkJoin, Subscription} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string;
  sliced: string;
  loginSubscription: Subscription;
  roleSubscription: Subscription;
  cotisationSubscription: Subscription;


  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getRole();
    }
  }

  onSubmit(): void {
    this.loginSubscription = this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(this.form.username);
        this.roleSubscription = this.authService.getRoleFromServer().subscribe(
          data2 => {
            this.sliced = JSON.stringify(data2).slice(15);
            this.sliced = this.sliced.slice(0, -3);
            this.tokenStorage.saveRole(this.sliced);

            if (this.tokenStorage.getRole().includes('LECTEUR')) {
              this.cotisationSubscription = this.authService.getCotisationFromServer(this.form.username).subscribe(
                cotisations => {
                  this.tokenStorage.saveCotisations(cotisations);
                  this.isLoginFailed = false;
                  this.isLoggedIn = true;
                  this.role = this.tokenStorage.getRole();
                  this.reloadPage();
              });
            }
            else {
                this.reloadPage();
              }
          }
        );
      },
      err => {
        this.errorMessage = err.error = 'Invalid username and/or password';
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}

