import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('*/api/analytics/metrics', () => {
    return HttpResponse.json({
      sessionDuration: '10m 30s',
      percentageIncrease: 25,
      chartData: [10, 20, 30, 40, 50, 60, 70],
      conversionRate: 15
    });
  }),
  
  http.get('*/api/user/profile', () => {
    return HttpResponse.json({
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      created_at: '2024-03-31T15:00:00Z'
    });
  })
];

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());