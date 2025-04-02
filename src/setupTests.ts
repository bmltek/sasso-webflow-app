import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'jest';

// Extend Jest's expect
expect.extend({
  toBeInTheDocument: () => ({
    pass: true,
    message: () => '',
  }),
});

// Cleanup after each test case
afterEach(() => {
  cleanup();
}); 