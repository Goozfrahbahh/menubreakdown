import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbodyInventoryComponent } from './tbody-inventory.component';

describe('TbodyInventoryComponent', () => {
  let component: TbodyInventoryComponent;
  let fixture: ComponentFixture<TbodyInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TbodyInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TbodyInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
