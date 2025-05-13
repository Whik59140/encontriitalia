'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { capitalizeCityName } from '@/lib/utils/string';
import { City, Category } from '@/types/geo';
import { MessageCircle, XCircle } from 'lucide-react';

interface GroupedCities {
  [region: string]: City[];
}

interface ChatHubClientProps {
  allCities: City[];
  allCategories: Category[];
}

export function ChatHubClient({ allCities, allCategories }: ChatHubClientProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndGroupedCities = useMemo(() => {
    if (!searchTerm.trim()) {
      return { sortedRegions: [], grouped: {} };
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = allCities.filter(city => 
      city.name.toLowerCase().includes(lowerSearchTerm)
    );

    const grouped = filtered.reduce<GroupedCities>((acc, city) => {
      const region = city.region || 'Altre Città';
      if (!acc[region]) {
        acc[region] = [];
      }
      acc[region].push(city);
      return acc;
    }, {});

    const sortedRegions = Object.keys(grouped).sort((a, b) => {
      if (a === 'Altre Città') return 1;
      if (b === 'Altre Città') return -1;
      return a.localeCompare(b);
    });
    
    return { sortedRegions, grouped };
  }, [searchTerm, allCities]);

  if (!allCities.length || !allCategories.length) {
     // This case should ideally be handled by the parent server component before rendering this client one
     // or by showing a more robust empty state if the parent might send empty arrays.
    return (
        <div className="text-center py-10">
            <MessageCircle size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
            <p className="text-lg text-gray-500 dark:text-gray-400">Nessuna chat room configurata.</p>
        </div>
    );
  }

  return (
    <>
      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Es: Roma, Milano, Napoli..."
            className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              aria-label="Clear search"
            >
              <XCircle size={20} />
            </button>
          )}
        </div>
      </div>

      {searchTerm.trim() === '' && (
        <div className="text-center py-10">
          <MessageCircle size={48} className="mx-auto mb-4 text-gray-400 dark:text-gray-500" />
          <p className="text-lg text-gray-500 dark:text-gray-400">Inizia digitando il nome della tua città qui sopra.</p>
        </div>
      )}

      {searchTerm.trim() !== '' && filteredAndGroupedCities.sortedRegions.length === 0 && (
        <div className="text-center py-10">
          <XCircle size={48} className="mx-auto mb-4 text-red-400 dark:text-red-500" />
          <p className="text-lg text-gray-500 dark:text-gray-400">
            {'Nessuna città trovata per "'}
            <span className='font-semibold'>{searchTerm}</span>
            {'" Prova con un altro nome.'}
          </p>
        </div>
      )}

      {searchTerm.trim() !== '' && filteredAndGroupedCities.sortedRegions.map((region) => (
        <section key={region} className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-pink-600 dark:text-pink-400 mb-6 border-b-2 border-pink-200 dark:border-pink-700 pb-2">
            {region}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
            {filteredAndGroupedCities.grouped[region].sort((a,b) => a.name.localeCompare(b.name)).map((city) => (
              <div key={city.slug} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">
                  {capitalizeCityName(city.name)}
                </h3>
                <ul className="space-y-1.5">
                  {allCategories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/${city.slug}/${category.slug}/chat`}
                        className="text-sm text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-500 hover:underline flex items-center group"
                      >
                        <MessageCircle size={14} className="mr-1.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                        Chat {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
} 