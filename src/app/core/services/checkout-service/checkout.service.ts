import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  constructor(private http: HttpClient) {}

  /**
   * Step 1: Create Razorpay order via backend
   */
  createOrder(amount: number) {
    return this.http.post<any>('https://payment-service-41up.onrender.com/api/create', {
      amount: amount * 100, // Razorpay expects paise,
      orderId: 'order_' + new Date().getTime() // Unique order ID
    });
  }

  /**
   * Step 2: Open Razorpay and handle payment
   */
  openRazorpay(order: any, userInfo: { name: string, email: string, contact: string }, onSuccess: (paymentId: string) => void, onFailure: () => void) {
    const options = {
      key: 'rzp_test_KpXMQXub4PbPYO', // Replace with your real Key ID
      amount: order.amount,
      currency: 'INR',
      name: 'CarpetEcom',
      description: 'Order Payment',
      order_id: order.id,
      handler: (response: any) => {
        // Call verify after payment
      const paymentId = response.razorpay_payment_id;
      console.log('Payment ID:', paymentId);

      this.verifyPayment(response).subscribe({
        next: (res) => {
          console.log('Verify success response:', res);
          onSuccess(paymentId);
        },
        error: (err) => {
          console.error('Verification failed:', err);
          onFailure();
        }
      });
      },
      prefill: userInfo,
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  /**
   * Step 3: Verify the payment on backend
   */
  verifyPayment(paymentData: {
    razorpay_order_id: string,
    razorpay_payment_amount: string,
    razorpay_signature: string
  }) {
    console.log('Verifying payment with data:', paymentData);
    return this.http.post('https://payment-service-41up.onrender.com/api/verify', paymentData);
  }
}
