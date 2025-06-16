import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCheckoutPage } from './order-checkout.page';

describe('OrderCheckoutPage', () => {
  let component: OrderCheckoutPage;
  let fixture: ComponentFixture<OrderCheckoutPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCheckoutPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCheckoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
