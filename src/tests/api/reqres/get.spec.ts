import { test, expect } from '@playwright/test';

test.describe.parallel('GET API test', () => {
  const baseURL = 'https://reqres.in/api';
  test('GET API Test - Assert response status', async ({ request }) => {
    const response = await request.get(`${baseURL}/users/2`);
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    console.log(responseBody);
  });

  test('GET API Test - Assert invalid endpoint', async ({ request }) => {
    const response = await request.get(`${baseURL}/users/abbbb`);
    expect(response.status()).toBe(404);
  });

  test('GET API Test - Get user detail', async ({ request }) => {
    const response = await request.get(`${baseURL}/users/1`);
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.data.id).toBe(1);
    expect(responseBody.data.first_name).toBe('George');
    expect(responseBody.data.last_name).toBe('Bluth');
    expect(responseBody.support.text).toBe(
      'Tired of writing endless social media content? Let Content Caddy generate it for you.',
    );
    console.log(responseBody);
  });
});
