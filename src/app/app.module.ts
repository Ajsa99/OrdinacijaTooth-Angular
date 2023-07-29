import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RegComponent } from './user/reg/reg.component';
import { LogComponent } from './user/log/log.component';
import { PocetnaComponent } from './body/pocetna/pocetna.component';
import { RouterModule, Routes } from '@angular/router';
import { PacijentiComponent } from './body/pacijenti/pacijenti.component';
import { TerminiComponent } from './body/termini/termini.component';
import { KartonComponent } from './body/karton/karton.component';
import { ZakaziTerminComponent } from './body/zakazi-termin/zakazi-termin.component';
import { DodajPacijentaComponent } from './body/dodaj-pacijenta/dodaj-pacijenta.component';
import { AuthService } from './services/auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { KorisnikService } from './services/korisnik.service';
import { IzmeniPacijentaComponent } from './body/izmeni-pacijenta/izmeni-pacijenta.component';
import { PregledPacijentaComponent } from './body/pregled-pacijenta/pregled-pacijenta.component';
import { StomatoloziComponent } from './body/stomatolozi/stomatolozi.component';
import { StomatologOdobriComponent } from './body/stomatolog-odobri/stomatolog-odobri.component';
import { AdministratoriComponent } from './body/administratori/administratori.component';
import { KorisnikInformacijeComponent } from './body/korisnik-informacije/korisnik-informacije.component';

const appRouters: Routes = [
  { path: 'pocetna', component: PocetnaComponent },
  { path: 'registracija', component: RegComponent },
  { path: '', component: LogComponent },
  { path: 'pacijenti', component: PacijentiComponent },
  { path: 'termini', component: TerminiComponent },
  { path: 'karton/:id', component: KartonComponent },
  { path: 'zakazitermin', component: ZakaziTerminComponent },
  { path: 'pregled/:id', component: PregledPacijentaComponent },
  { path: 'izmenipacijenta/:id', component: IzmeniPacijentaComponent },
  { path: 'dodajpacijenta', component: DodajPacijentaComponent },
  { path: 'stomatolozi', component: StomatoloziComponent },
  { path: 'stomatologodobri', component: StomatologOdobriComponent },
  { path: 'administratori', component: AdministratoriComponent },
  { path: 'korisnikinfo/:id', component: KorisnikInformacijeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideMenuComponent,
    RegComponent,
    LogComponent,
    PocetnaComponent,
    PacijentiComponent,
    TerminiComponent,
    KartonComponent,
    ZakaziTerminComponent,
    DodajPacijentaComponent,
    IzmeniPacijentaComponent,
    PregledPacijentaComponent,
    StomatoloziComponent,
    StomatologOdobriComponent,
    AdministratoriComponent,
    KorisnikInformacijeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRouters),
    HttpClientModule,
    FormsModule,
  ],
  providers: [AuthService, KorisnikService],
  bootstrap: [AppComponent],
})
export class AppModule {}
