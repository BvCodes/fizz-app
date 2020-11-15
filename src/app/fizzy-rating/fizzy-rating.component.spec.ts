import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizzyRatingComponent } from './fizzy-rating.component';

describe('FizzyRatingComponent', () => {
  let component: FizzyRatingComponent;
  let fixture: ComponentFixture<FizzyRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizzyRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizzyRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
