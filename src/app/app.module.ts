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
import { BibliothequeCatalogueComponent } from './component/bibliotheque/bibliotheque-catalogue/bibliotheque-catalogue.component';
import { CartComponent } from './component/cart/cart.component';
import {CartService} from './services/cart.service';
import { BibliothequeNewComponent } from './component/bibliotheque/bibliotheque-new/bibliotheque-new.component';
import {RoleGuardService} from './services/role-guard.service';
import { LivreNewComponent } from './component/livre/livre-new/livre-new.component';

const appRoutes: Routes = [
  { path: 'bibliotheques/:id/new', canActivate: [RoleGuardService], component: LivreNewComponent, data : { expectedRole: ['MANAGER', 'GENERAL']}},
  { path: 'bibliotheques/new', canActivate: [RoleGuardService], component: BibliothequeNewComponent, data : { expectedRole: 'GENERAL'}},
  { path: 'bibliotheques', component: BibliothequeListComponent},
  { path: 'bibliotheques/:id', component: BibliothequeCatalogueComponent},
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
    BibliothequeCatalogueComponent,
    CartComponent,
    BibliothequeNewComponent,
    LivreNewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    CartService,
    BibliothequeService,
    AuthService,
    AuthGuardService,
    RoleGuardService,
    TokenStorageService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
