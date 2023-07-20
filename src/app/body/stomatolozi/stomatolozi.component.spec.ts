import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StomatoloziComponent } from './stomatolozi.component';

describe('StomatoloziComponent', () => {
  let component: StomatoloziComponent;
  let fixture: ComponentFixture<StomatoloziComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StomatoloziComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StomatoloziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
