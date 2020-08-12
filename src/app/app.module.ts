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
import { LibraryListComponent } from './component/library/library-list/library-list.component';
import {LibraryService} from './services/library.service';

const appRoutes: Routes = [
  { path: 'bibliothèques', component: LibraryListComponent },
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
    LibraryListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    LibraryService,
    AuthService,
    AuthGuardService,
    TokenStorageService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
