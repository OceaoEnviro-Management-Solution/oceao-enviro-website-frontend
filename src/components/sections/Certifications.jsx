import React, { useState } from 'react';
import { certifications } from '../../constants/certifications';
import { X, ZoomIn } from 'lucide-react';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-brand-blue mb-4">
            Our Certifications & Accreditations
          </h2>
          <p className="text-lg text-gray-600">
            Trusted by Regulatory Bodies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col items-center"
              onClick={() => setSelectedCert(cert)}
            >
              {/*
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gray-50 border border-gray-100">
                <img 
                  src={cert.image} 
                  alt={cert.alt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay on hover */}
              {/*
                <div className="absolute inset-0 bg-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white text-brand-blue p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
              </div>
              */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gray-50 border border-gray-100 group">
                <iframe
                  src={`${cert.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  title={cert.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 border-none"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="bg-white text-brand-blue p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-800 text-center">
                {cert.name}
              </h3>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedCert(null)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-brand-blue" id="modal-title">
                {selectedCert.name}
              </h3>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 overflow-auto bg-gray-50 flex-grow flex items-center justify-center">
              <img
                src={selectedCert.image}
                alt={selectedCert.alt}
                className="max-w-full h-auto max-h-[70vh] object-contain rounded border border-gray-200 shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
