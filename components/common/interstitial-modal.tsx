'use client';

import React from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';

interface InterstitialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  categoryName: string;
  cityName: string;
  title?: string; // Optional custom title
  description?: string; // Optional custom description (expects placeholders {categoryName} and {cityName})
  warningText?: string; // Optional custom warning text
  confirmButtonText?: string; // Optional custom confirm button text
  cancelButtonText?: string; // Optional custom cancel button text
}

export function InterstitialModal({
  isOpen,
  onClose,
  onConfirm,
  categoryName,
  cityName,
  title = "Conferma l'Accesso! ✅", // Default title
  description = `Stai per scoprire profili di {categoryName} 100% reali e verificati a {cityName}!\n\nL'iscrizione è gratuita, richiede solo la tua email e meno di 1 minuto. Accettiamo solo profili autentici.`,
  warningText = "Importante: Dopo l'iscrizione, controlla la tua casella di posta elettronica (anche la cartella SPAM!) per l'email di conferma.",
  confirmButtonText = "Conferma e Scopri i Profili",
  cancelButtonText = "Annulla",
}: InterstitialModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose(); // Close modal after confirmation
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-xl bg-white dark:bg-gray-800 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          aria-label="Chiudi modale"
        >
          <X size={24} />
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm sm:text-base whitespace-pre-line">
              {description.replace('{categoryName}', categoryName).replace('{cityName}', cityName)}
            </p>
            
            <div className="space-y-3 text-left bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-700 w-full mb-6">
              <p className="flex items-start">
                <CheckCircle size={20} className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-200">L&apos;iscrizione è <strong className='font-semibold'>100% GRATUITA</strong>.</span>
              </p>
              <p className="flex items-start">
                <CheckCircle size={20} className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-200">Richiede solo <strong className='font-semibold'>30 secondi</strong> del tuo tempo.</span>
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border border-yellow-300 dark:border-yellow-700 w-full mb-6">
              <div className="flex items-start">
                <AlertTriangle size={20} className="text-yellow-600 dark:text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-700 dark:text-yellow-200">
                  <strong className='font-semibold'>{warningText.includes('Importante:') ? '' : 'Importante: '}</strong> 
                  {warningText.replace('Importante: ', '')}
                </p>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-lg"
            >
              {confirmButtonText}
            </button>
            <button
              onClick={onClose}
              className="mt-3 text-sm text-gray-600 dark:text-gray-400 hover:underline"
            >
              {cancelButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 