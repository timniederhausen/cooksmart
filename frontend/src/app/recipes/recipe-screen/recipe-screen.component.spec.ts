import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeScreenComponent } from './recipe-screen.component';

describe('RecipeScreenComponent', () => {
  let component: RecipeScreenComponent;
  let fixture: ComponentFixture<RecipeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
