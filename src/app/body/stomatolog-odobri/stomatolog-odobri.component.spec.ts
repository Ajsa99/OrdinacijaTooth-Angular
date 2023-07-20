import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StomatologOdobriComponent } from './stomatolog-odobri.component';

describe('StomatologOdobriComponent', () => {
  let component: StomatologOdobriComponent;
  let fixture: ComponentFixture<StomatologOdobriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StomatologOdobriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StomatologOdobriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
