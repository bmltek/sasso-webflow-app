import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isScrolled?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isScrolled = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            microflow
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="desktop">
            <Link to="/features" className="hover:text-blue-600">
              Features
            </Link>
            <Link to="/pricing" className="hover:text-blue-600">
              Pricing
            </Link>
            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4" role="group" aria-label="desktop auth">
            <button className="px-4 py-2 text-blue-600 hover:text-blue-700">
              Sign In
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`md:hidden ${
            isMenuOpen ? 'block' : 'hidden'
          } mt-4 pb-4`}
          aria-label="mobile"
        >
          <div className="flex flex-col space-y-4">
            <Link to="/features" className="hover:text-blue-600">
              Features
            </Link>
            <Link to="/pricing" className="hover:text-blue-600">
              Pricing
            </Link>
            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>
            <button className="px-4 py-2 text-blue-600 hover:text-blue-700">
              Sign In
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sign Up
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};