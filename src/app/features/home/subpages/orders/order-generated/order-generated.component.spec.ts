import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGeneratedComponent } from './order-generated.component';

describe('OrderGeneratedComponent', () => {
  let component: OrderGeneratedComponent;
  let fixture: ComponentFixture<OrderGeneratedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderGeneratedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
