import { ExternalLink } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function CertificateCard({ certificate }) {
  const [pdfError, setPdfError] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row bg-white border border-gray-200 rounded-lg p-5 mb-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      
      {/* Left section: PDF Thumbnail */}
      <div className="w-full sm:w-[150px] h-[200px] flex-shrink-0 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center relative group">
        {!pdfError ? (
          <div className="w-full h-full flex justify-center items-center pointer-events-none">
            <Document
              file={certificate.pdfUrl}
              onLoadError={() => setPdfError(true)}
              loading={<div className="text-xs text-gray-400">Loading...</div>}
            >
              <Page 
                pageNumber={1} 
                width={150} 
                renderTextLayer={false} 
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium">PDF</span>
          </div>
        )}
        
        {/* Thumbnail Click Overlay */}
        <a 
          href={certificate.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center cursor-pointer"
          title="Open PDF"
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

        {/* View PDF Button */}
        <div className="flex justify-end mt-4">
          <a
            href={certificate.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#017119] text-white font-semibold rounded-md hover:bg-[#015a14] shadow hover:shadow-md transition-all duration-200"
          >
            <span>View PDF</span>
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
