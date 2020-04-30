import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartListComponent } from './smart-list.component';

describe('SmartListComponent', () => {
  let component: SmartListComponent<any>;
  let fixture: ComponentFixture<SmartListComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
