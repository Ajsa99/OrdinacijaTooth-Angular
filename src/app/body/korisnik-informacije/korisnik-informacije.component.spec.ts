import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikInformacijeComponent } from './korisnik-informacije.component';

describe('KorisnikInformacijeComponent', () => {
  let component: KorisnikInformacijeComponent;
  let fixture: ComponentFixture<KorisnikInformacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KorisnikInformacijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KorisnikInformacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
