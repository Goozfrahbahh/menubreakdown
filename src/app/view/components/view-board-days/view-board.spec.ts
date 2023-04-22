import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewBoardDaysComponent } from './view-board.component';

describe('CalendarComponent', () => {
  let component: ViewBoardDaysComponent;
  let fixture: ComponentFixture<ViewBoardDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewBoardDaysComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewBoardDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
