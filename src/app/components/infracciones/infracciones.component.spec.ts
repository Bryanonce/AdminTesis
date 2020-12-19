import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraccionesComponent } from './infracciones.component';

describe('InfraccionesComponent', () => {
  let component: InfraccionesComponent;
  let fixture: ComponentFixture<InfraccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
