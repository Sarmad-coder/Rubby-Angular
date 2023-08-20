import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Onboarding14Component } from './onboarding1.4.component';

describe('Onboarding14Component', () => {
  let component: Onboarding14Component;
  let fixture: ComponentFixture<Onboarding14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Onboarding14Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Onboarding14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
