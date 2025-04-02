import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock the router
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders main navigation elements', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/analytics/i)).toBeInTheDocument();
    expect(screen.getByText(/metrics/i)).toBeInTheDocument();
  });

  it('handles search functionality', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Search...');
    
    await userEvent.type(searchInput, 'test search');
    expect(searchInput).toHaveValue('test search');
  });

  it('toggles filter options when filter button is clicked', () => {
    render(<App />);
    const filterButton = screen.getByText('Filter');
    
    // Initially filter options should not be visible
    expect(screen.queryByText('Filter options')).not.toBeInTheDocument();
    
    // Click filter button
    fireEvent.click(filterButton);
    
    // Filter options should now be visible
    expect(screen.getByText('Filter options')).toBeInTheDocument();
    
    // Click filter button again
    fireEvent.click(filterButton);
    
    // Filter options should be hidden again
    expect(screen.queryByText('Filter options')).not.toBeInTheDocument();
  });

  it('displays error boundary for component errors', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    const { container } = render(
      <App>
        <ThrowError />
      </App>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  describe('Navigation', () => {
    it('renders dashboard by default', () => {
      render(<App />);
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });

    it('renders analytics page when analytics link is clicked', async () => {
      render(<App />);
      const analyticsLink = screen.getByText('Analytics');
      
      await userEvent.click(analyticsLink);
      expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
    });

    it('renders metrics page when metrics link is clicked', async () => {
      render(<App />);
      const metricsLink = screen.getByText('Metrics');
      
      await userEvent.click(metricsLink);
      expect(screen.getByText('Metrics Dashboard')).toBeInTheDocument();
    });
  });
}); 