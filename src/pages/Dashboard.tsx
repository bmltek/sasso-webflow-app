import React, { useState } from 'react';
import { Header } from '../components/Header';
import { 
  BarChart, 
  Server, 
  Users,
  Activity,
  Clock,
  Database,
  Shield,
  Settings
} from 'lucide-react';

function Dashboard() {
  const [isScrolled, setIsScrolled] = useState(false);

  const stats = [
    {
      label: "Active Services",
      value: "24",
      icon: <Server className="h-6 w-6 text-emerald-500" />,
      change: "+12%"
    },
    {
      label: "Total Users",
      value: "1,234",
      icon: <Users className="h-6 w-6 text-emerald-500" />,
      change: "+8%"
    },
    {
      label: "Avg Response Time",
      value: "45ms",
      icon: <Activity className="h-6 w-6 text-emerald-500" />,
      change: "-15%"
    },
    {
      label: "Uptime",
      value: "99.99%",
      icon: <Clock className="h-6 w-6 text-emerald-500" />,
      change: "+0.01%"
    }
  ];

  const services = [
    {
      name: "User Service",
      status: "Healthy",
      uptime: "99.99%",
      responseTime: "42ms"
    },
    {
      name: "Payment Service",
      status: "Healthy",
      uptime: "99.95%",
      responseTime: "56ms"
    },
    {
      name: "Notification Service",
      status: "Warning",
      uptime: "99.90%",
      responseTime: "89ms"
    },
    {
      name: "Analytics Service",
      status: "Healthy",
      uptime: "99.99%",
      responseTime: "38ms"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isScrolled={isScrolled} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex space-x-4">
            <button className="bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Database className="h-5 w-5 text-gray-600" />
            </button>
            <button className="bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Shield className="h-5 w-5 text-gray-600" />
            </button>
            <button className="bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-emerald-50 p-2 rounded-lg">
                  {stat.icon}
                </div>
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Services Status</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uptime
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Response Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{service.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        service.status === 'Healthy' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {service.uptime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {service.responseTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;