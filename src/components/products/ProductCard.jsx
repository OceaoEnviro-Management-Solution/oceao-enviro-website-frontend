// ProductCard.jsx — Single product: image/carousel, category badge, name, description

import { Link } from 'react-router-dom';
import ProductCarousel from './ProductCarousel';

export default function ProductCard({ product }) {
  return (
    <article
      id={`product-card-${product.id}`}
      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <ProductCarousel images={product.images} alt={product.name} />

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-[#017119] bg-[#E4F3E6] px-2.5 py-0.5 rounded-full">
            {product.category}
          </span>
          <Link
            to="/contact/quick-contact"
            id={`product-enquiry-${product.id}`}
            aria-label={`Buy or enquire about ${product.name}`}
            className="px-4 py-1.5 rounded-full bg-[#017119] hover:bg-[#014D11] text-white text-xs font-semibold transition-colors duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#017119]"
          >
            Buy / Enquiry
          </Link>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#0F1D75] mb-2">{product.name}</h3>
          <span className="block w-8 h-1 bg-[#FFA500] rounded-full mb-3 transition-all duration-300 group-hover:w-14" />
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
        </div>
      </div>
    </article>
  );
}
