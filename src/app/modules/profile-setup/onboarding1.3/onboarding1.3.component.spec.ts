import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Onboarding13Component } from './onboarding1.3.component';

describe('Onboarding13Component', () => {
  let component: Onboarding13Component;
  let fixture: ComponentFixture<Onboarding13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Onboarding13Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Onboarding13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
