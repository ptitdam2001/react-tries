import '@testing-library/jest-dom';

// Mock ResizeObserver pour jsdom
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;
