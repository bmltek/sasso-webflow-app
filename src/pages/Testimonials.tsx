import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Star } from 'lucide-react';

function Testimonials() {
  const [isScrolled, setIsScrolled] = useState(false);

  const testimonials = [
    {
      content: "The microservices platform has transformed how we build and deploy applications. The scalability and ease of use are unmatched.",
      author: "Sarah Chen",
      role: "CTO",
      company: "TechFlow Inc.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80"
    },
    {
      content: "We've seen a 300% improvement in deployment speed since switching to this platform. The developer experience is exceptional.",
      author: "Michael Rodriguez",
      role: "Lead Developer",
      company: "CloudScale",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80"
    },
    {
      content: "The security features and compliance tools have made it easy for us to meet our enterprise requirements while maintaining agility.",
      author: "Emily Thompson",
      role: "Security Engineer",
      company: "SecureBank",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80"
    },
    {
      content: "The auto-scaling capabilities have helped us handle traffic spikes effortlessly. Our infrastructure costs have decreased by 40%.",
      author: "David Kim",
      role: "DevOps Manager",
      company: "ScaleUp Solutions",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80"
    },
    {
      content: "The platform's monitoring and analytics tools give us unprecedented visibility into our microservices performance.",
      author: "Lisa Patel",
      role: "Engineering Director",
      company: "DataFlow Systems",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80"
    },
    {
      content: "We've been able to focus on building features instead of managing infrastructure. The ROI has been incredible.",
      author: "James Wilson",
      role: "Product Manager",
      company: "InnovateNow",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-lime-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              What Our Customers Say
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Join thousands of satisfied developers and teams who trust our platform
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
            >
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;