'use client';

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { CityPagination } from '@/components/common/city-pagination';

interface City {
  slug: string;
  name: string;
}

interface CitySearchAndDisplayProps {
  allCities: City[];
  itemsPerPage?: number;
}

export function CitySearchAndDisplay({ allCities, itemsPerPage = 15 }: CitySearchAndDisplayProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCities = useMemo(() => {
    if (!searchTerm) {
      return allCities;
    }
    return allCities.filter(city => 
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allCities, searchTerm]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Search Bar */}
      <div className="mb-8 md:mb-12 w-full max-w-lg relative">
        <Input 
          type="search" 
          placeholder="Cerca la tua città... (es. Roma, Milano, Napoli)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pr-12 rounded-full border-2 border-gray-300 dark:border-gray-600 \
                     focus:ring-2 focus:ring-purple-500 focus:border-purple-500 \
                     dark:bg-gray-700 dark:text-white shadow-lg transition-all duration-300 ease-in-out \
                     focus:shadow-purple-300/50 dark:focus:shadow-purple-800/50"
        />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>

      {/* City List with Pagination */}
      <CityPagination cities={filteredCities} itemsPerPage={itemsPerPage} />
    </div>
  );
} 