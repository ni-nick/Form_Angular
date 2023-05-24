import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsRegisterComponent } from './items-register.component';

describe('ItemsRegisterComponent', () => {
  let component: ItemsRegisterComponent;
  let fixture: ComponentFixture<ItemsRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsRegisterComponent]
    });
    fixture = TestBed.createComponent(ItemsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
