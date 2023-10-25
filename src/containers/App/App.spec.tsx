import { render, screen } from '@testing-library/react';
import App from './App';

describe('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hotel Reservation System/i);
  expect(linkElement).toBeInTheDocument();
});
