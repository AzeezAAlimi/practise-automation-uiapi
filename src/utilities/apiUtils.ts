import { APIRequestContext, APIResponse } from '@playwright/test';

interface LoginPayload {
  userEmail: string;
  userPassword: string;
}

interface OrderPayload {
  orders: { country: string; productOrderedId: string }[];
}

interface CreateOrderResponse {
    token: string;
    orderId: string;
}
export class APIUtils {
  private apiContext: APIRequestContext;
  private loginPayload: LoginPayload;

  constructor(apiContext: APIRequestContext, loginPayload: LoginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      {
        data: this.loginPayload,
      },
    );
    const loginResponseJson = await loginResponse.json();
    return loginResponseJson.token;
  }

  async createOrder(orderPayload: OrderPayload) {
    const token = await this.getToken();
    const orderResponse: APIResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/order/create-order',
      {
        data: orderPayload,
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
    );
    const orderResponseJson = await orderResponse.json();
    const orderId = orderResponseJson.orders[0];
    return { token, orderId };
  }
}
