import { getInfluencers } from '../../lib/data-loader';
import { Metadata } from 'next';
import { InfluencerSearchAndDisplay } from '../../components/common/influencer-search-display';

export const metadata: Metadata = {
  title: 'All Influencers | Our Platform',
  description: 'Browse and search our comprehensive list of influencers.',
};

const ITEMS_PER_PAGE = 16;

export default async function InfluencersListPage() {
  const influencers = await getInfluencers();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">All Influencers</h1>
      
      {(!influencers || influencers.length === 0) ? (
        <p className="text-center text-xl text-gray-500 dark:text-gray-400">No influencers found.</p>
      ) : (
        <InfluencerSearchAndDisplay 
          allInfluencers={influencers} 
          itemsPerPage={ITEMS_PER_PAGE} 
        />
      )}
    </div>
  );
} 