import { ExternalLink } from 'lucide-react';

export default function CertificateCard({ certificate }) {

  return (
    <div className="flex flex-col sm:flex-row bg-white border border-gray-200 rounded-lg p-5 mb-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      
      {/* Left section: Image Thumbnail */}
      <div className="w-full sm:w-[150px] h-[200px] flex-shrink-0 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center relative group">
        <img 
          src={certificate.imgUrl} 
          alt={certificate.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        
        {/* Thumbnail Click Overlay */}
        <a 
          href={certificate.imgUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center cursor-pointer"
          title="View Certificate"
        >
        </a>
      </div>

      {/* Center & Right section container */}
      <div className="flex flex-col flex-grow sm:pl-5 mt-4 sm:mt-0">
        
        {/* Name & Description */}
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-[#0F1D75] mb-2">{certificate.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-3 md:line-clamp-none">
            {certificate.description}
          </p>
        </div>

        {/* View Certificate Button */}
        <div className="flex justify-end mt-4">
          <a
            href={certificate.imgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#017119] text-white font-semibold rounded-md hover:bg-[#015a14] shadow hover:shadow-md transition-all duration-200"
          >
            <span>View Certificate</span>
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
