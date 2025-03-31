import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ArrowRight, Cloud, Shield, Zap, RefreshCw } from 'lucide-react';

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />
      <Hero 
        title="Microservices"
        subtitle="Build scalable and maintainable applications with our modern microservices platform."
        ctaText="Get Started"
        secondaryCtaText="Learn More"
      />
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600">Built for modern development teams</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Cloud className="h-8 w-8 text-emerald-500" />,
                title: "Cloud Native",
                description: "Built for the modern cloud with containerization and orchestration."
              },
              {
                icon: <Shield className="h-8 w-8 text-emerald-500" />,
                title: "Enterprise Security",
                description: "Bank-grade security with end-to-end encryption and compliance."
              },
              {
                icon: <Zap className="h-8 w-8 text-emerald-500" />,
                title: "High Performance",
                description: "Optimized for speed with distributed caching and load balancing."
              },
              {
                icon: <RefreshCw className="h-8 w-8 text-emerald-500" />,
                title: "Auto Scaling",
                description: "Intelligent scaling based on real-time metrics and traffic."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-lime-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to get started?</h2>
          <button 
            className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all inline-flex items-center"
          >
            Start Building Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;