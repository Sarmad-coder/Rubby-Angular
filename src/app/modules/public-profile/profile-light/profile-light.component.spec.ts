import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLightComponent } from './profile-light.component';

describe('ProfileLightComponent', () => {
  let component: ProfileLightComponent;
  let fixture: ComponentFixture<ProfileLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileLightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
