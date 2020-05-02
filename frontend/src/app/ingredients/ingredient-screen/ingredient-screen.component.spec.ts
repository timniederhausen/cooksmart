import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientScreenComponent } from './ingredient-screen.component';

describe('IngredientScreenComponent', () => {
  let component: IngredientScreenComponent;
  let fixture: ComponentFixture<IngredientScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
