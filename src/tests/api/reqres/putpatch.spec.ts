import { test, expect } from '@playwright/test';

test.describe.parallel('PUT / PATCH API test', () => {
  const baseURL = 'https://reqres.in/api';
  test('PUT API Test - Update user - Successful', async ({ request }) => {
    const response = await request.put(`${baseURL}/users/2`, {
      data: {
        name: 'Hello',
        job: 'Bye',
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.name).toBe('Hello');
    expect(responseBody.job).toBe('Bye');
    expect(responseBody.updatedAt).toBeTruthy();
  });

  test('PATCH API Test - Update user - Successful', async ({ request }) => {
    const response = await request.put(`${baseURL}/users/2`, {
      data: {
        name: 'Bye',
        job: 'Hello',
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.name).toBe('Bye');
    expect(responseBody.job).toBe('Hello');
    expect(responseBody.updatedAt).toBeTruthy();
  });
});
