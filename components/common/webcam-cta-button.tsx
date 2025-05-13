'use client';

import React, { useState } from 'react';
import { PlayCircle, Sparkles } from 'lucide-react';
import { InterstitialModal } from '@/components/common/interstitial-modal';
import { WEBCAM_AFFILIATE_LINK_GAY, WEBCAM_AFFILIATE_LINK_GENERAL } from '@/lib/constants';
import { Button } from '@/components/ui/button';

interface WebcamCtaButtonProps {
  cityDisplayName: string;
  categoryDisplayName: string;
  categorySlug: string;
}

export function WebcamCtaButton({ cityDisplayName, categoryDisplayName, categorySlug }: WebcamCtaButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const webcamLink = categorySlug === 'gay' ? WEBCAM_AFFILIATE_LINK_GAY : WEBCAM_AFFILIATE_LINK_GENERAL;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleConfirmRedirect = () => {
    window.open(webcamLink, '_blank');
  };

  const modalTitle = `🔞 Webcam HOT Live! 🔥`;
  const modalDescription = `Stai per vedere webcam ${categoryDisplayName} dal vivo a ${cityDisplayName}! 💖 L'accesso è 100% GRATUITO e richiede solo un istante.

Entra e scopri performance ESCLUSIVE e piccanti! 🌶️✨`;
  const modalConfirmButtonText = "Live Webcam Ora! 🚀";

  return (
    <>
      <Button 
        onClick={handleOpenModal}
        variant="default"
        size="lg"
        className="w-full sm:w-auto bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 hover:from-red-600 hover:via-pink-600 hover:to-purple-700 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center space-x-2 mt-6 mb-4 py-4 px-8 rounded-lg text-lg"
      >
        <Sparkles size={24} className="mr-2 text-yellow-300" />
        <span>Live Webcam {categoryDisplayName} a {cityDisplayName} 🔞</span>
        <PlayCircle size={24} className="ml-2 text-yellow-300" />
      </Button>

      <InterstitialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmRedirect}
        categoryName={categoryDisplayName} // For the modal, categoryDisplayName is fine
        cityName={cityDisplayName}
        title={modalTitle}
        description={modalDescription}
        confirmButtonText={modalConfirmButtonText}
        warningText="Assicurati di avere una buona connessione e che la tua webcam (se vuoi interagire) sia configurata."
      />
    </>
  );
} 