import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../../constants/services';

export default function Services() {
  return (
    <section id="services" className="py-5 lg:py-24 bg-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center pb-5 max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-brand-blue mb-4">
            Our Services
          </h2>
          {/* <p className="text-lg text-gray-600">
            Comprehensive Environmental Solutions
          </p> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {services.map((service) => {
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl hover:scale-[1.2] hover:z-10 hover:bg-[#011539] transition-all duration-300 group flex flex-col h-full overflow-hidden relative"
              >
                <div className="w-full h-40 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-brand-blue group-hover:text-white transition-colors duration-300 mb-3 leading-tight">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-300 text-sm mb-6 flex-grow leading-relaxed">
                    {service.description}
                  </p>

                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 text-brand-orange font-semibold text-sm group-hover:text-orange-400 transition-colors mt-auto"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
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
