import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToPage } from './how-to.page';

describe('HowToPage', () => {
  let component: HowToPage;
  let fixture: ComponentFixture<HowToPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
