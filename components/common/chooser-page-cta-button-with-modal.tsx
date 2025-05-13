'use client';

import React, { useState } from 'react';
import { InterstitialModal } from './interstitial-modal'; // Adjust path as needed
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

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

  const modalTitle = `Accesso Esclusivo Incontri ${categoryDisplayName} a ${cityDisplayName}!`;
  const modalDescription = [
    `Stai per accedere alla piattaforma N.1 per incontri ${categoryDisplayName} a ${cityDisplayName} con profili 100% reali e verificati!`, 
    'L\'iscrizione è GRATUITA, richiede solo la tua email e meno di 1 minuto.',
    'Ricorda di CONFERMARE la tua EMAIL (controlla anche la cartella SPAM) per attivare il tuo profilo e iniziare subito.'
  ].join('\n\n');
  const modalWarning = 'NB: Su questa piattaforma troverai solo profili autentici. Non è tollerato spam o profili falsi.';

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
            {modalTitle}
          </h2>
          <p className="text-md sm:text-lg text-pink-100 dark:text-pink-200 mb-6 max-w-2xl mx-auto">
            Profili 100% Veri e Iscrizione GRATUITA in 1 Minuto! Solo Email Richiesta.
            La piattaforma partner n.1 in Italia per incontri ti aspetta. Registrati gratuitamente e scopri migliaia di profili autentici e verificati.
          </p>
          <Button
            onClick={handleOpenModal}
            size="lg"
            className="bg-white text-pink-600 hover:bg-pink-50 dark:bg-gray-800 dark:text-pink-300 dark:hover:bg-gray-700 font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-lg sm:text-xl"
          >
            🚀 VAI AI PROFILI ORA!
          </Button>
        </div>
      </section>

      {isModalOpen && (
        <InterstitialModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmRedirect}
          title="Conferma l'Accesso! ✅"
          description={modalDescription}
          warningText={modalWarning}
          confirmButtonText="Sì, Accedi Ora!"
          cancelButtonText="No, Resta Qui"
          categoryName={categoryDisplayName} // Used in the modal text placeholders if any
          cityName={cityDisplayName} // Used in the modal text placeholders if any
        />
      )}
    </>
  );
} 