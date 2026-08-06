import React from 'react';
import { ArrowRight, Activity, Beaker, Lightbulb, CheckCircle, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../../constants/services';

// Map string icon names to Lucide components
const IconMap = {
  Activity,
  Beaker,
  Lightbulb,
  CheckCircle,
  Trash2
};

export default function Services() {
  return (
    <section id="services" className="py-16 lg:py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-brand-blue mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive Environmental Solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {services.map((service) => {
            const Icon = IconMap[service.icon];
            
            return (
              <div 
                key={service.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
              >
                <div className={`w-14 h-14 rounded-full ${service.color} text-white flex items-center justify-center mb-6 shadow-sm`}>
                  {Icon && <Icon className="w-7 h-7" />}
                </div>
                
                <h3 className="text-lg font-bold text-brand-blue mb-3 leading-tight">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                  {service.description}
                </p>
                
                <Link 
                  to="/services" 
                  className="inline-flex items-center gap-2 text-brand-orange font-semibold text-sm group-hover:text-orange-600 transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link 
            to="/services"
            className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full text-white font-semibold text-base bg-brand-blue hover:bg-brand-blue-dark transition-colors shadow-md"
          >
            Explore All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
