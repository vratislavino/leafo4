import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScharacteristicsPage } from './scharacteristics.page';

describe('ScharacteristicsPage', () => {
  let component: ScharacteristicsPage;
  let fixture: ComponentFixture<ScharacteristicsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScharacteristicsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScharacteristicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
