import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSocialComponent } from './profile-social.component';

describe('ProfileSocialComponent', () => {
  let component: ProfileSocialComponent;
  let fixture: ComponentFixture<ProfileSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
