import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarHidComponent } from './navbar-hid.component';

describe('NavbarHidComponent', () => {
  let component: NavbarHidComponent;
  let fixture: ComponentFixture<NavbarHidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarHidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarHidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
