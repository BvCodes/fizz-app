import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizzListComponent } from './fizz-list.component';

describe('FizzListComponent', () => {
  let component: FizzListComponent;
  let fixture: ComponentFixture<FizzListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizzListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizzListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
