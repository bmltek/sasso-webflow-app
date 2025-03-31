import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';
import { describe, it, expect } from 'vitest';

describe('Hero Component', () => {
  const defaultProps = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    ctaText: 'Get Started',
    secondaryCtaText: 'Learn More'
  };

  it('renders hero content correctly', () => {
    render(<Hero {...defaultProps} />);
    
    expect(screen.getByText(/Test Title/)).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(<Hero {...defaultProps} />);
    
    const section = screen.getByRole('region');
    expect(section).toHaveClass('relative', 'min-h-[90vh]', 'flex', 'items-center');
  });
});