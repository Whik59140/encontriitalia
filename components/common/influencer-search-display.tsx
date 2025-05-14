'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Influencer } from '../../lib/data-loader'; // Adjust path as necessary
import { homePageStrings } from '../../app/translations'; // Added for placeholder text

interface InfluencerSearchAndDisplayProps {
  allInfluencers: Influencer[];
  itemsPerPage?: number;
}

export function InfluencerSearchAndDisplay({ 
  allInfluencers,
  itemsPerPage = 10 
}: InfluencerSearchAndDisplayProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredInfluencers = useMemo(() => {
    if (!searchTerm) {
      return allInfluencers;
    }
    return allInfluencers.filter(influencer =>
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.variations.some(v => v.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [allInfluencers, searchTerm]);

  const totalPages = Math.ceil(filteredInfluencers.length / itemsPerPage);
  const currentInfluencers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredInfluencers.slice(start, end);
  }, [filteredInfluencers, currentPage, itemsPerPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="text"
        placeholder={homePageStrings.searchInfluencerPlaceholder}
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full px-4 py-3 mb-6 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500 transition-shadow duration-200 ease-in-out"
      />

      {filteredInfluencers.length === 0 && searchTerm && (
        <p className="text-center text-gray-500 dark:text-gray-400">No influencers found matching your search.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {currentInfluencers.map(influencer => (
          <Link key={influencer.slug} href={`/influencers/${influencer.slug}`} passHref>
            <div className="block p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md dark:bg-gray-800 dark:border-gray-700 hover:dark:bg-gray-700 transition-all duration-200 ease-in-out h-full">
              <h3 className="text-xl font-semibold text-pink-600 dark:text-pink-400 hover:underline">{influencer.name}</h3>
              {/* <p className="text-sm text-gray-500 dark:text-gray-400">{influencer.slug}</p> */}
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map(num => {
            const pageNum = num + 1;
            // Show first page, last page, and pages around current page
            const showPage = pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 2 && pageNum <= currentPage + 2);
            if (!showPage) {
                if (pageNum === 2 && currentPage > 4) return <span key={num} className="px-2 py-2">...</span>;
                if (pageNum === totalPages - 1 && currentPage < totalPages - 3) return <span key={num} className="px-2 py-2">...</span>;
                return null;
            }
            return (
              <button
                key={num}
                onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2 text-sm font-medium border rounded-md ${currentPage === pageNum 
                  ? 'bg-pink-500 text-white border-pink-500' 
                  : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600'}`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
} 