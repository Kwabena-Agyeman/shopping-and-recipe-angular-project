import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeNavigationHomeComponent } from './recipe-navigation-home.component';

describe('RecipeNavigationHomeComponent', () => {
  let component: RecipeNavigationHomeComponent;
  let fixture: ComponentFixture<RecipeNavigationHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeNavigationHomeComponent]
    });
    fixture = TestBed.createComponent(RecipeNavigationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
