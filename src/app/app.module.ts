import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { FourOhFourComponent } from './component/four-oh-four/four-oh-four.component';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {TokenStorageService} from './services/token-storage.service';
import {authInterceptorProviders} from './services/http-interceptor-auth.service';
import { LoginComponent } from './component/login/login.component';
import { BibliothequeListComponent } from './component/bibliotheque/bibliotheque-list/bibliotheque-list.component';
import {BibliothequeService} from './services/bibliotheque.service';

const appRoutes: Routes = [
  { path: 'bibliotheques', component: BibliothequeListComponent},
  { path: 'login', component: LoginComponent },
  { path: '', canActivate: [AuthGuardService], component: LoginComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    FourOhFourComponent,
    LoginComponent,
    BibliothequeListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    BibliothequeService,
    AuthService,
    AuthGuardService,
    TokenStorageService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
