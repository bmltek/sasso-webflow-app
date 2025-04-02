import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Hero } from '../Hero';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Hero Component', () => {
  it('renders without crashing', () => {
    renderWithRouter(<Hero />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('renders title and subtitle', () => {
    renderWithRouter(<Hero />);
    expect(screen.getByText(/welcome to microflow/i)).toBeInTheDocument();
    expect(screen.getByText(/streamline your workflow/i)).toBeInTheDocument();
  });

  it('renders call-to-action link', () => {
    renderWithRouter(<Hero />);
    const link = screen.getByRole('link', { name: /get started/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/signup');
  });
});