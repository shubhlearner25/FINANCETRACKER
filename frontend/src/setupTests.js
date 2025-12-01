import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Ensure components are unmounted and DOM is reset after each test
afterEach(() => {
  cleanup();
});
