import { render, screen } from '@testing-library/react';
import InlineSearchMenu from 'src/InlineSearchMenu';

test('renders learn react link', () => {
  render(<InlineSearchMenu />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
