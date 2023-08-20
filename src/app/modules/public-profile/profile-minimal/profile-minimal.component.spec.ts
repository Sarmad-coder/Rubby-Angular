import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMinimalComponent } from './profile-minimal.component';

describe('ProfileMinimalComponent', () => {
  let component: ProfileMinimalComponent;
  let fixture: ComponentFixture<ProfileMinimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMinimalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileMinimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
