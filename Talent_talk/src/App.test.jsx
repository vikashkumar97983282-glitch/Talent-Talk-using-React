import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import App from './App';
import '@testing-library/jest-dom'; // <--- this fixes toBeInTheDocument

test('renders the admin login route', async () => {
  render(
    <MemoryRouter initialEntries={['/admin']}>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByText(/admin login/i)).toBeInTheDocument();
});

test('renders student button', () => {
  render(<MemoryRouter><App /></MemoryRouter>);

  expect(screen.getByText(/student/i)).toBeInTheDocument();
});

test('renders company login route', async () => {
  render(
    <MemoryRouter initialEntries={['/company']}>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByText(/company login/i)).toBeInTheDocument();
});

test('renders client login route', async () => {
  render(
    <MemoryRouter initialEntries={['/client']}>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByRole('heading', { name: /^login$/i })).toBeInTheDocument();
});

test('navigates from the home panel to the admin login page', async () => {
  render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);

  fireEvent.click(screen.getByRole('button', { name: /admin/i }));

  expect(await screen.findByText(/admin login/i)).toBeInTheDocument();
});
