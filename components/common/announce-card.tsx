'use client';

import Image from 'next/image';
// import Link from 'next/link'; // No longer a direct link
import { ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import { InterstitialModal } from './interstitial-modal'; // Adjust path as needed

interface AnnounceCardProps {
  imageUrl: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  altText: string;
  categoryDisplayName: string; // Added
  cityDisplayName: string;     // Added
  isOnline: boolean; // New prop
  registrationTime: string; // New prop
}

export function AnnounceCard({
  imageUrl,
  title,
  description,
  ctaText,
  ctaLink,
  altText,
  categoryDisplayName,
  cityDisplayName,
  isOnline, // New prop
  registrationTime, // New prop
}: AnnounceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    // Redirect to affiliate link
    window.open(ctaLink, '_blank', 'noopener,noreferrer');
    setIsModalOpen(false); // Close modal after confirmation
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div 
        className="group relative block cursor-pointer overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white dark:bg-gray-800"
        onClick={handleCardClick}
        onKeyPress={(e) => e.key === 'Enter' && handleCardClick()} // Accessibility
        role="button" // Accessibility
        tabIndex={0}  // Accessibility
      >
        <div className="relative h-48 w-full overflow-hidden sm:h-56">
          <Image
            src={imageUrl}
            alt={altText}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            priority={false} // For non-LCP images
          />
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate group-hover:text-pink-600 dark:group-hover:text-pink-400">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {description}
          </p>

          {/* User Status Information */}
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
            <span className={`h-2.5 w-2.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'} flex-shrink-0`}></span>
            <span>{isOnline ? 'Online' : 'Offline'}</span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="truncate" title={registrationTime}>{registrationTime}</span>
          </div>

          <span // Changed from Link to span, click handled by div
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform group-hover:scale-105 w-full justify-center"
          >
            {ctaText}
            <ArrowRight size={18} className="ml-1" />
          </span>
        </div>
      </div>
      <InterstitialModal 
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        categoryName={categoryDisplayName}
        cityName={cityDisplayName}
      />
    </>
  );
} 