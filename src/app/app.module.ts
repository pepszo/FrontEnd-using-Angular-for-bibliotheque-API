import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, NgSelectOption, ReactiveFormsModule} from '@angular/forms';
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
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgSelectModule} from '@ng-select/ng-select';
import { BibliothequeCatalogueAddBookComponent } from './component/bibliotheque/bibliotheque-catalogue-add-book/bibliotheque-catalogue-add-book.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { LocationComponent } from './component/location/location.component';

const appRoutes: Routes = [
  // tslint:disable-next-line:max-line-length
  { path: 'reservation', canActivate: [RoleGuardService], component: LocationComponent, data : { expectedRole: ['LECTEUR'] } },
  { path: 'bibliotheques/:id/add-book', canActivate: [RoleGuardService], component: BibliothequeCatalogueAddBookComponent, data : { expectedRole: ['MANAGER', 'GENERAL']  } },
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
    BibliothequeCatalogueAddBookComponent,
    LocationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    NgSelectModule,
    NgbModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSliderModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
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
