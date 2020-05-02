import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListScreenComponent } from './shopping-list-screen.component';

describe('ShoppingListScreenComponent', () => {
  let component: ShoppingListScreenComponent;
  let fixture: ComponentFixture<ShoppingListScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
