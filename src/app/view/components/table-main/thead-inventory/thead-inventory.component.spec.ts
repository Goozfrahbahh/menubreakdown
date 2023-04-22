import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheadInventoryComponent } from './thead-inventory.component';

describe('TheadInventoryComponent', () => {
  let component: TheadInventoryComponent;
  let fixture: ComponentFixture<TheadInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheadInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheadInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
