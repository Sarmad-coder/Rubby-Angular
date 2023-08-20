import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Onboarding11Component } from './onboarding1.1.component';

describe('Onboarding11Component', () => {
  let component: Onboarding11Component;
  let fixture: ComponentFixture<Onboarding11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Onboarding11Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Onboarding11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
