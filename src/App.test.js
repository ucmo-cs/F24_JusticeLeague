import { render, screen } from '@testing-library/react';
//import App from './App';
import LoginForm from './pages/LoginForm';

test('renders learn react link', () => {
  render(<LoginForm />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});