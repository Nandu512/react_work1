import { render, screen } from '@testing-library/react';
import App from './App';

test('renders register page', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /register/i });
  expect(headingElement).toBeInTheDocument();
});
