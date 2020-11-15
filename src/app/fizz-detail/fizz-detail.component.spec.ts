import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizzDetailComponent } from './fizz-detail.component';

describe('FizzDetailComponent', () => {
  let component: FizzDetailComponent;
  let fixture: ComponentFixture<FizzDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizzDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizzDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
