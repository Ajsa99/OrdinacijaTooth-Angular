import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledPacijentaComponent } from './pregled-pacijenta.component';

describe('PregledPacijentaComponent', () => {
  let component: PregledPacijentaComponent;
  let fixture: ComponentFixture<PregledPacijentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledPacijentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledPacijentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
