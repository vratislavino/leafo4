import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SothersPage } from './sothers.page';

describe('SothersPage', () => {
  let component: SothersPage;
  let fixture: ComponentFixture<SothersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SothersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SothersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
