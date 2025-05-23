import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';

const queryClient = new QueryClient();

test('renders React Flow', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
  // Vérifie que le composant React Flow est présent (par exemple, par un texte ou un rôle)
  // À adapter selon le contenu réel de App.tsx
  expect(screen.getByText(/react flow example/i)).toBeInTheDocument();
});
