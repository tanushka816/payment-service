import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InAuthAdminComponent } from './in-auth-admin.component';

describe('InAuthAdminComponent', () => {
  let component: InAuthAdminComponent;
  let fixture: ComponentFixture<InAuthAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InAuthAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InAuthAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
