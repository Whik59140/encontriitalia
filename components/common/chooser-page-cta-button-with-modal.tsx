'use client';

import React, { useState } from 'react';
import { InterstitialModal } from './interstitial-modal'; // Adjust path as needed
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { chooserPageCtaStrings } from '@/app/translations'; // Import translations

interface ChooserPageCtaButtonWithModalProps {
  cityDisplayName: string;
  categoryDisplayName: string;
  affiliateLink: string;
}

export function ChooserPageCtaButtonWithModal({
  cityDisplayName,
  categoryDisplayName,
  affiliateLink,
}: ChooserPageCtaButtonWithModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generatedModalTitle = chooserPageCtaStrings.modalTitleTemplate(categoryDisplayName, cityDisplayName);
  
  const modalDescription = [
    chooserPageCtaStrings.modalDescriptionPart1(categoryDisplayName, cityDisplayName),
    chooserPageCtaStrings.modalDescriptionPart2,
    chooserPageCtaStrings.modalDescriptionPart3
  ].join('\n\n');
  // const modalWarning = chooserPageCtaStrings.modalWarning; // This will be used directly in the InterstitialModal prop

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmRedirect = () => {
    window.open(affiliateLink, '_blank');
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="py-8 sm:py-12 bg-gradient-to-br from-pink-500 via-red-500 to-rose-600 dark:from-pink-700 dark:via-red-700 dark:to-rose-800 rounded-lg shadow-xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {generatedModalTitle}
          </h2>
          <p className="text-md sm:text-lg text-pink-100 dark:text-pink-200 mb-6 max-w-2xl mx-auto">
            {chooserPageCtaStrings.ctaSectionDescription}
          </p>
          <Button
            onClick={handleOpenModal}
            size="lg"
            className="bg-white text-pink-600 hover:bg-pink-50 dark:bg-gray-800 dark:text-pink-300 dark:hover:bg-gray-700 font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-lg sm:text-xl"
          >
            {chooserPageCtaStrings.ctaButtonText}
          </Button>
        </div>
      </section>

      {isModalOpen && (
        <InterstitialModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmRedirect}
          title={chooserPageCtaStrings.interstitialTitle}
          description={modalDescription}
          warningText={chooserPageCtaStrings.modalWarning}
          confirmButtonText={chooserPageCtaStrings.interstitialConfirmButton}
          cancelButtonText={chooserPageCtaStrings.interstitialCancelButton}
          categoryName={categoryDisplayName}
          cityName={cityDisplayName}
        />
      )}
    </>
  );
} 