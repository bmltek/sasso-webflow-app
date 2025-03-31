import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Code, Database, Cloud, Lock, Zap, RefreshCw, GitBranch, Terminal } from 'lucide-react';

function Features() {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-lime-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Powerful Features
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Everything you need to build and scale your microservices architecture
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Code className="h-8 w-8" />,
              title: "Modern Development",
              description: "Use the latest technologies and frameworks with our modern development stack."
            },
            {
              icon: <Database className="h-8 w-8" />,
              title: "Database Integration",
              description: "Seamless integration with popular databases and data storage solutions."
            },
            {
              icon: <Cloud className="h-8 w-8" />,
              title: "Cloud Native",
              description: "Built for the cloud with containerization and orchestration support."
            },
            {
              icon: <Lock className="h-8 w-8" />,
              title: "Security First",
              description: "Enterprise-grade security with encryption and compliance built-in."
            },
            {
              icon: <Zap className="h-8 w-8" />,
              title: "High Performance",
              description: "Optimized for speed with caching and load balancing capabilities."
            },
            {
              icon: <RefreshCw className="h-8 w-8" />,
              title: "Auto Scaling",
              description: "Automatic scaling based on real-time metrics and traffic patterns."
            },
            {
              icon: <GitBranch className="h-8 w-8" />,
              title: "Version Control",
              description: "Built-in support for version control and collaborative development."
            },
            {
              icon: <Terminal className="h-8 w-8" />,
              title: "CLI Tools",
              description: "Powerful command-line tools for efficient development workflows."
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
            >
              <div className="text-emerald-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;