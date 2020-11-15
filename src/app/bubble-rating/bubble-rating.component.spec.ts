import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleRatingComponent } from './bubble-rating.component';

describe('BubbleRatingComponent', () => {
  let component: BubbleRatingComponent;
  let fixture: ComponentFixture<BubbleRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubbleRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
