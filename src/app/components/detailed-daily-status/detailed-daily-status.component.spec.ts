import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedDailyStatusComponent } from './detailed-daily-status.component';

//TODO: add test cases
describe('DetailedDailyStatusComponent', () => {
  let component: DetailedDailyStatusComponent;
  let fixture: ComponentFixture<DetailedDailyStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedDailyStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedDailyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
