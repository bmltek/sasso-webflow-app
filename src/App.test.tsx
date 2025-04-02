import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeDefined();
  });

  it('renders main navigation elements', () => {
    render(<App />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('displays the dashboard by default', () => {
    render(<App />);
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  it('handles navigation correctly', async () => {
    render(<App />);
    const user = userEvent.setup();
    
    // Click analytics link
    const analyticsLink = screen.getByText(/analytics/i);
    await user.click(analyticsLink);
    expect(screen.getByText(/analytics dashboard/i)).toBeInTheDocument();
    
    // Click metrics link
    const metricsLink = screen.getByText(/metrics/i);
    await user.click(metricsLink);
    expect(screen.getByText(/metrics dashboard/i)).toBeInTheDocument();
  });

  it('handles user interactions in the dashboard', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Test search functionality
    const searchInput = screen.getByPlaceholderText(/search/i);
    await user.type(searchInput, 'test search');
    expect(searchInput).toHaveValue('test search');

    // Test filter functionality
    const filterButton = screen.getByText(/filter/i);
    await user.click(filterButton);
    expect(screen.getByText(/filter options/i)).toBeInTheDocument();
  });

  it('displays error boundary for component errors', () => {
    const originalError = console.error;
    console.error = jest.fn();

    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <App>
        <ThrowError />
      </App>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    console.error = originalError;
  });
}); 