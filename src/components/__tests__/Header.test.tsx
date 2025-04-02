import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../Header';

// Mock the router
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
  useLocation: () => ({
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: 'default'
  })
}));

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Header Component', () => {
  it('renders without crashing', () => {
    renderWithRouter(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays the logo', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('microflow')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Header />);
    // Target desktop navigation
    const desktopNav = screen.getByRole('navigation', { name: /desktop/i });
    expect(desktopNav).toBeInTheDocument();
    expect(desktopNav).toHaveTextContent('Features');
    expect(desktopNav).toHaveTextContent('Pricing');
    expect(desktopNav).toHaveTextContent('Contact');
  });

  it('renders auth buttons', () => {
    renderWithRouter(<Header />);
    // Target desktop auth buttons
    const desktopAuth = screen.getByRole('group', { name: /desktop auth/i });
    expect(desktopAuth).toBeInTheDocument();
    expect(desktopAuth).toHaveTextContent('Sign In');
    expect(desktopAuth).toHaveTextContent('Sign Up');
  });

  it('toggles mobile menu when menu button is clicked', () => {
    renderWithRouter(<Header />);
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);
    
    // Check if mobile menu items are visible
    const mobileNav = screen.getByRole('navigation', { name: /mobile/i });
    expect(mobileNav).toBeVisible();
    expect(mobileNav).toHaveTextContent('Features');
    expect(mobileNav).toHaveTextContent('Pricing');
    expect(mobileNav).toHaveTextContent('Contact');
  });

  it('applies scrolled styles when isScrolled prop is true', () => {
    renderWithRouter(<Header isScrolled={true} />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-white/90');
  });

  it('does not apply scrolled styles when isScrolled prop is false', () => {
    renderWithRouter(<Header isScrolled={false} />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-transparent');
  });

  it('renders mobile menu button', () => {
    renderWithRouter(<Header />);
    expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument();
  });
});