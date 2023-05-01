import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntreeDetailComponent } from './entree-detail.component';

describe('EntreeDetailComponent', () => {
  let component: EntreeDetailComponent;
  let fixture: ComponentFixture<EntreeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntreeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntreeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
