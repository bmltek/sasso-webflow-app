import { Boxes, Cloud, Network, RefreshCw, Shield, Zap } from 'lucide-react';
import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: "Microservices Architecture",
      description: "Build scalable and maintainable applications with our modern microservices platform.",
      icon: Network,
      color: "text-emerald-600"
    },
    {
      title: "Cloud Native",
      description: "Deploy your applications anywhere with our cloud-native infrastructure.",
      icon: Cloud,
      color: "text-blue-600"
    },
    {
      title: "High Performance",
      description: "Lightning-fast performance with optimized resource utilization.",
      icon: Zap,
      color: "text-yellow-600"
    },
    {
      title: "Security First",
      description: "Enterprise-grade security with end-to-end encryption.",
      icon: Shield,
      color: "text-red-600"
    },
    {
      title: "Auto Scaling",
      description: "Automatically scale your applications based on demand.",
      icon: RefreshCw,
      color: "text-purple-600"
    },
    {
      title: "Container Orchestration",
      description: "Efficiently manage your containers with our advanced orchestration.",
      icon: Boxes,
      color: "text-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Features</h1>
          <p className="text-xl text-gray-600">Everything you need to build modern applications</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${feature.color} mb-4`}>
                  <Icon className="h-12 w-12" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h2>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features; 