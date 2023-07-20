import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniPacijentaComponent } from './izmeni-pacijenta.component';

describe('IzmeniPacijentaComponent', () => {
  let component: IzmeniPacijentaComponent;
  let fixture: ComponentFixture<IzmeniPacijentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmeniPacijentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IzmeniPacijentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
