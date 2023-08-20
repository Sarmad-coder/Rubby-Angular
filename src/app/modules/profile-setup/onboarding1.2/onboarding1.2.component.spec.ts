import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Onboarding12Component } from './onboarding1.2.component';

describe('Onboarding12Component', () => {
  let component: Onboarding12Component;
  let fixture: ComponentFixture<Onboarding12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Onboarding12Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Onboarding12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
