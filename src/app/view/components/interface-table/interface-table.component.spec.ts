import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceTableComponent } from './interface-table.component';

describe('InterfaceTableComponent', () => {
  let component: InterfaceTableComponent;
  let fixture: ComponentFixture<InterfaceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfaceTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterfaceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
