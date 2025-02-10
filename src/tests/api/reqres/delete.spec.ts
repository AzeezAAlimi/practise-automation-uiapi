import { test, expect } from '@playwright/test';

test.describe.parallel('DELETE API test', () => {
  const baseURL = 'https://reqres.in/api';
  test('DELETE API Test - Delete user - Successful', async ({ request }) => {
    const response = await request.delete(`${baseURL}/users/2`, {});
    expect(response.status()).toBe(204);
  });
});
