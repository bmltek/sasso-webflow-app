import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../Header';
import { describe, it, expect } from 'vitest';

describe('Header Component', () => {
  const renderHeader = (isScrolled = false) => {
    return render(
      <BrowserRouter>
        <Header isScrolled={isScrolled} />
      </BrowserRouter>
    );
  };

  it('renders logo and navigation items', () => {
    renderHeader();
    expect(screen.getByText('microflow')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
  });

  it('applies scroll styles when isScrolled is true', () => {
    renderHeader(true);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-white/90');
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    renderHeader();
    const menuButton = screen.getByLabelText('Toggle menu');
    
    fireEvent.click(menuButton);
    expect(screen.getByText('Sign In')).toBeVisible();
    
    fireEvent.click(menuButton);
    expect(screen.queryByRole('navigation')).not.toBeVisible();
  });
});