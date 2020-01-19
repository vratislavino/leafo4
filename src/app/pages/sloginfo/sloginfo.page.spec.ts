import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SloginfoPage } from './sloginfo.page';

describe('SloginfoPage', () => {
  let component: SloginfoPage;
  let fixture: ComponentFixture<SloginfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SloginfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SloginfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
