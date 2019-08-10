import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepressionPage } from './depression.page';

describe('DepressionPage', () => {
  let component: DepressionPage;
  let fixture: ComponentFixture<DepressionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepressionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepressionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
