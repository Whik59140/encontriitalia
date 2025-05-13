'use client';

import React from 'react';
import Image from 'next/image';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';
import { interstitialModalStrings } from '@/app/translations'; // Import translations

interface InterstitialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  categoryName: string;
  cityName: string;
  title?: string;
  description?: string;
  warningText?: string; // This will now map to the main text, prefix is handled separately
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export function InterstitialModal({
  isOpen,
  onClose,
  onConfirm,
  categoryName,
  cityName,
  title = interstitialModalStrings.defaultTitle,
  description,
  warningText = interstitialModalStrings.warningMainText, // Default to main text
  confirmButtonText = interstitialModalStrings.confirmButtonText,
  cancelButtonText = interstitialModalStrings.cancelButtonText,
}: InterstitialModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const finalDescription = description
    ? description.replace('{categoryName}', categoryName).replace('{cityName}', cityName)
    : interstitialModalStrings.defaultDescription(categoryName, cityName);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-xl bg-white dark:bg-gray-800 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          aria-label={interstitialModalStrings.closeButtonAria}
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
              {finalDescription}
            </p>
            
            <div className="space-y-3 text-left bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-700 w-full mb-6">
              <div className="flex items-start">
                <CheckCircle size={20} className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-200 flex items-center">
                  <Image
                    src="/images/secure-connection.png"
                    alt={interstitialModalStrings.secureConnectionImageAlt}
                    width={20}
                    height={20}
                    className="mr-1.5"
                  />
                  {interstitialModalStrings.secureConnectionText}
                </span>
              </div>
              <p className="flex items-start">
                <CheckCircle size={20} className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-200">{interstitialModalStrings.freeRegistrationText}</span>
              </p>
              <p className="flex items-start">
                <CheckCircle size={20} className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-200">{interstitialModalStrings.takes30SecondsText}</span>
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border border-yellow-300 dark:border-yellow-700 w-full mb-6">
              <div className="flex items-start">
                <AlertTriangle size={20} className="text-yellow-600 dark:text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-700 dark:text-yellow-200">
                  <strong className='font-semibold'>{interstitialModalStrings.warningPrefix}</strong> 
                  {warningText} {/* This prop now defaults to warningMainText */}
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