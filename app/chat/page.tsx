// No 'use client' directive here, this is a Server Component
import { Metadata } from 'next';
// Link import is not needed here directly if ChatHubClient handles all Link components
import { getAllCities } from '@/lib/utils/geo';
import { getAllCategories } from '@/lib/utils/category-utils';
// capitalizeCityName is used in ChatHubClient, not directly here unless for a fallback message
// import { City, Category } from '@/types/geo'; // Types might still be useful - Removed as unused
import { Search } from 'lucide-react'; // Icons for the static part of the page - Removed MessageCircle
import { ChatHubClient } from '@/components/common/chat-hub-client'; // Import the new client component
import { chatPageStrings } from '@/app/translations'; // Import translations

export const metadata: Metadata = {
  title: chatPageStrings.metadataTitle,
  description: chatPageStrings.metadataDescription,
  keywords: chatPageStrings.metadataKeywords,
  alternates: {
    canonical: '/chat',
  },
};

// interface GroupedCities is now internal to ChatHubClient

export default async function ChatHubPage() {
  // Fetch data on the server
  const allCities = await getAllCities();
  const allCategories = await getAllCategories();

  // Handle initial loading or no data state directly in the server component if preferred,
  // or pass potentially empty arrays to the client component to handle its own empty/loading states.
  // For this example, we assume ChatHubClient can handle empty allCities/allCategories if necessary.

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <header className="text-center mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100">
          <Search className="inline-block mr-3 text-pink-500 h-8 w-8 sm:h-10 sm:w-10" />
          {chatPageStrings.mainHeading}
        </h1>
        <p className="text-md sm:text-lg text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
          {chatPageStrings.subHeading}
        </p>
      </header>

      {/* Render the client component and pass data as props */}
      <ChatHubClient allCities={allCities} allCategories={allCategories} />
      
    </div>
  );
} 