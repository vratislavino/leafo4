import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SAccountPage } from './s-account.page';

describe('SAccountPage', () => {
  let component: SAccountPage;
  let fixture: ComponentFixture<SAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SAccountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
