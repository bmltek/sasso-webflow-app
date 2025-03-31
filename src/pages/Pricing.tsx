import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Check } from 'lucide-react';

function Pricing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      price: isAnnual ? 49 : 59,
      description: "Perfect for small teams and startups",
      features: [
        "Up to 5 team members",
        "Basic monitoring",
        "10 microservices",
        "Community support",
        "Basic analytics",
        "99.9% uptime SLA"
      ]
    },
    {
      name: "Professional",
      price: isAnnual ? 99 : 119,
      description: "For growing teams and businesses",
      features: [
        "Up to 20 team members",
        "Advanced monitoring",
        "Unlimited microservices",
        "Priority support",
        "Advanced analytics",
        "99.99% uptime SLA",
        "Custom domains",
        "API gateway"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Unlimited team members",
        "Enterprise monitoring",
        "Unlimited microservices",
        "24/7 dedicated support",
        "Custom analytics",
        "99.999% uptime SLA",
        "Custom domains",
        "Advanced security",
        "Dedicated infrastructure"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />
      
      {/* Pricing Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-lime-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your team
            </p>
            
            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1">
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  isAnnual ? 'bg-white text-emerald-600' : 'text-white'
                }`}
                onClick={() => setIsAnnual(true)}
              >
                Annual (Save 20%)
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  !isAnnual ? 'bg-white text-emerald-600' : 'text-white'
                }`}
                onClick={() => setIsAnnual(false)}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-emerald-500 to-lime-400 text-white transform scale-105'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <p className={`mb-6 ${plan.highlighted ? 'text-emerald-100' : 'text-gray-600'}`}>
                {plan.description}
              </p>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                </span>
                {typeof plan.price === 'number' && (
                  <span className={plan.highlighted ? 'text-emerald-100' : 'text-gray-600'}>
                    /month
                  </span>
                )}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className={`h-5 w-5 mr-2 ${plan.highlighted ? 'text-white' : 'text-emerald-500'}`} />
                    <span className={plan.highlighted ? 'text-white' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-6 rounded-full font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-white text-emerald-600 hover:shadow-lg'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pricing;