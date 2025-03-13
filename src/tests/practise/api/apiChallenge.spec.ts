import { test, expect } from '@playwright/test';

test.describe('API challenge', () => {
  test('GET /products/{id}', async ({ request }) => {
    const apiURL = 'https://api.practicesoftwaretesting.com';
    const getProductResponse = await request.get(
      apiURL + '/products/search?q=thor%20hammer',
    );
    expect(getProductResponse.status()).toBe(200);
    const productBody = await getProductResponse.json();
    const productId = productBody.data[0].id;

    const response = await request.get(apiURL + '/products/' + productId);

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.in_stock).toBe(true);
    expect(body.is_location_offer).toBe(false);
    expect(body.is_rental).toBe(false);
    expect(body.name).toBe('Thor Hammer');
    expect(body.price).toBe(11.14);
  });
});
