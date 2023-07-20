import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajPacijentaComponent } from './dodaj-pacijenta.component';

describe('DodajPacijentaComponent', () => {
  let component: DodajPacijentaComponent;
  let fixture: ComponentFixture<DodajPacijentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajPacijentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajPacijentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
