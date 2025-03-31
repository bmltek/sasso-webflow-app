import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { HeroProps } from '../types';

export function Hero({ title, subtitle, ctaText, secondaryCtaText }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-lime-500 opacity-90" />
      
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-32">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
            <span className="text-lime-200 text-sm font-medium">New: Auto-scaling microservices</span>
            <ArrowRight className="w-4 h-4 ml-2 text-lime-200" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            {title}
            <span className="bg-gradient-to-r from-lime-300 to-yellow-300 bg-clip-text text-transparent">
              {' '}for the future
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-emerald-100 mb-12 max-w-3xl mx-auto">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-lime-400 hover:bg-lime-300 text-emerald-900 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105">
              {ctaText}
            </button>
            <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all">
              {secondaryCtaText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}