import React from 'react';
import { ArrowRight, Droplet, Zap, Filter, Cloud, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products, laboratoryCapabilities } from '../../constants/products';

const IconMap = {
  Droplet,
  Zap,
  Filter,
  Cloud
};

export default function Products() {
  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-brand-blue mb-4">
            Our Products & Laboratory Capabilities
          </h2>
          <p className="text-lg text-gray-600">
            State-of-the-art facilities and sustainable products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-16">
          
          {/* Products Grid */}
          <div>
            <h3 className="text-2xl font-bold text-brand-green mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-brand-orange rounded-full"></span>
              Featured Products
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map((product) => {
                const Icon = IconMap[product.icon];
                return (
                  <Link 
                    key={product.id}
                    to={`/products`}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-brand-green/30 hover:shadow-lg transition-all duration-300 group block"
                  >
                    <div className="w-12 h-12 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center mb-4 group-hover:bg-brand-green group-hover:text-white transition-colors">
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>
                    <h4 className="text-lg font-bold text-brand-blue mb-2 group-hover:text-brand-green transition-colors">
                      {product.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-8">
              <Link 
                to="/products"
                className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:text-orange-600 transition-colors group"
              >
                View All Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Laboratory Capabilities */}
          <div>
            <h3 className="text-2xl font-bold text-brand-blue mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-brand-green rounded-full"></span>
              Laboratory Capabilities
            </h3>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl shadow-brand-blue/5">
              <ul className="grid grid-cols-1 gap-4">
                {laboratoryCapabilities.map((capability, index) => (
                  <li key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-brand-green-light text-brand-green flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-gray-700 font-medium">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
