'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface City {
  slug: string;
  name: string;
}

interface CityPaginationProps {
  cities: City[];
  itemsPerPage: number;
}

export function CityPagination({ cities, itemsPerPage }: CityPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCities = cities.slice(startIndex, endIndex);

  function handlePreviousPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  function handleNextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }

  if (!cities || cities.length === 0) {
    return <p className='text-center text-gray-500 dark:text-gray-400'>Nessuna città da mostrare.</p>;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
        {currentCities.map((city) => (
          <Link 
            href={`/${city.slug}`} 
            key={city.slug} 
            className="block hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg"
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer bg-white dark:bg-gray-800">
              <CardHeader className="p-4">
                <CardTitle className="text-md sm:text-lg text-center font-semibold text-gray-700 dark:text-gray-200">
                  {city.name}
                </CardTitle>
              </CardHeader>
              {/* Optional: Add CardContent if you want more details on the card */}
            </Card>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <Button 
            onClick={handlePreviousPage} 
            disabled={currentPage === 1}
            variant="outline"
          >
            Precedente
          </Button>
          <span className="text-gray-700 dark:text-gray-300">
            Pagina {currentPage} di {totalPages}
          </span>
          <Button 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Successiva
          </Button>
        </div>
      )}
    </div>
  );
} 