import { render, screen } from '@testing-library/react';
import Logo from '../Logo';

describe('Logo Component', () => {
  it('renders the logo SVG with correct attributes', () => {
    render(<Logo />);
    const svgElement = screen.getByRole('img', { name: 'Logo' });
    expect(svgElement).toBeInTheDocument();
    expect(svgElement.tagName).toBe('svg');
    expect(svgElement).toHaveAttribute('width', '158');
    expect(svgElement).toHaveAttribute('height', '37');
    expect(svgElement).toHaveAttribute('viewBox', '0 0 158 37');
    expect(svgElement).toHaveAttribute('fill', 'none');
    expect(svgElement).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expect(svgElement).toHaveAttribute('role', 'img');
    expect(svgElement).toHaveAttribute('aria-label', 'Logo');
  });

  it('renders all SVG paths with correct attributes', () => {
    render(<Logo />);
    const paths = screen.getByRole('img', { name: 'Logo' }).querySelectorAll('path');
    expect(paths).toHaveLength(9); // There are 9 path elements in the SVG
    paths.forEach(path => {
      expect(path).toHaveAttribute('fill', 'white');
      expect(path).toHaveAttribute('d');
    });
  });
}); 