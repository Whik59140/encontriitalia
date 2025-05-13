'use client';

import React, { useState } from 'react';
import { InterstitialModal } from './interstitial-modal'; // Adjust path as needed
import { globalSiteStrings } from '@/app/translations'; // Import global translations

interface CategoryCtaButtonWithModalProps {
  affiliateUrl: string;
  buttonText: string;
  categoryName: string; // For the modal
  className?: string; // To pass down existing button styles
  cityNameForModal?: string; // Optional city name for the modal
}

export function CategoryCtaButtonWithModal({
  affiliateUrl,
  buttonText,
  categoryName,
  className,
  cityNameForModal, // Added
}: CategoryCtaButtonWithModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={className || "block w-full px-6 py-4 bg-pink-500 text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"} // Default styling if none provided
      >
        {buttonText}
      </button>
      <InterstitialModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        categoryName={categoryName} // Use passed categoryName
        cityName={cityNameForModal || globalSiteStrings.defaultCityFallback} // Use translated fallback
      />
    </>
  );
} 