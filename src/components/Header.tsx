import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Network, Boxes } from 'lucide-react';
import type { HeaderProps } from '../types';

const navItems = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

export function Header({ isScrolled }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:py-6">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center text-emerald-600">
                <Network className="h-8 w-8" />
                <Boxes className="h-8 w-8 -ml-2" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent">
                microflow
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-gray-600 hover:text-emerald-600 transition-colors font-medium ${
                  location.pathname === item.href ? 'text-emerald-600' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/signin"
              className="bg-gradient-to-r from-emerald-500 to-lime-400 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Sign In
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium text-gray-600 hover:text-emerald-600 transition-colors ${
                    location.pathname === item.href ? 'text-emerald-600' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/signin"
                className="block w-full mt-4 bg-gradient-to-r from-emerald-500 to-lime-400 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all text-center"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}