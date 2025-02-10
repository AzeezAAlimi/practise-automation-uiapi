import { test, expect } from '@playwright/test';

test.describe.parallel('POST API test', () => {
  const baseURL = 'https://reqres.in/api';
  test('POST API Test - Create new user - Successful', async ({ request }) => {
    const response = await request.post(`${baseURL}/users`, {
      data: {
        id: 999,
        name: 'freddie',
        job: 'teacher',
      },
    });
    expect(response.status()).toBe(201);
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.id).toBe(999);
    expect(responseBody.name).toBe('freddie');
    expect(responseBody.job).toBe('teacher');
    expect(responseBody.createdAt).toBeTruthy();
  });

  test('POST API Test - Register new user - Successful', async ({
    request,
  }) => {
    const response = await request.post(`${baseURL}/register`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'pistol',
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    console.log(responseBody);
    expect(responseBody.id).toBe(4);
    expect(responseBody.token).toBe('QpwL5tke4Pnpja7X4');
  });

  test('POST API Test - Register new user - Unsuccessful', async ({
    request,
  }) => {
    const response = await request.post(`${baseURL}/register`, {
      data: {
        email: 'sydney@fife',
      },
    });
    expect(response.status()).toBe(400);
    const responseBody = JSON.parse(await response.text());
    console.log(responseBody);
    expect(responseBody.error).toBe('Missing password');
  });

  test('POST API Test - Register login - Successful', async ({ request }) => {
    const response = await request.post(`${baseURL}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.token).toBeTruthy();
  });

  test('POST API Test - Register login - Unsuccessful', async ({ request }) => {
    const response = await request.post(`${baseURL}/login`, {
      data: {
        email: 'peter@klaven',
      },
    });
    expect(response.status()).toBe(400);
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.error).toBe('Missing password');
  });
});
