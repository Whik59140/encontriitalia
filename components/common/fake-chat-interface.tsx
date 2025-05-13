'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { InterstitialModal } from './interstitial-modal';
import { MessageSquare, Smile } from 'lucide-react';
import { fakeChatInterfaceStrings } from '@/app/translations'; // Import translations

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  avatar?: string; // Emoji or initial
}

interface FakeChatInterfaceProps {
  cityDisplayName: string;
  categoryDisplayName: string;
  affiliateLink: string;
  initialMessagesConfig: Array<{
    sender: 'bot' | 'user';
    textTemplate: string; // Use templates to insert city/category
    avatar?: string;
    delay: number;
  }>;
  chatCtaButtonText?: string;
}

export function FakeChatInterface({
  cityDisplayName,
  categoryDisplayName,
  affiliateLink,
  initialMessagesConfig,
  chatCtaButtonText = fakeChatInterfaceStrings.defaultCtaButtonText, // Use translated default
}: FakeChatInterfaceProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);

  const processTextTemplate = useCallback((template: string) => {
    return template
      .replace('{categoryName}', categoryDisplayName)
      .replace('{cityName}', cityDisplayName);
  }, [categoryDisplayName, cityDisplayName]);

  // Process the CTA button text as well
  const processedCtaButtonText = processTextTemplate(chatCtaButtonText);

  useEffect(() => {
    // Initialize online users count
    setOnlineUsersCount(Math.floor(Math.random() * 201) + 300); // Random number between 300 and 500

    const interval = setInterval(() => {
      setOnlineUsersCount(prevCount => {
        const fluctuation = Math.floor(Math.random() * 11) - 5; // Random number between -5 and 5
        let newCount = prevCount + fluctuation;
        if (newCount < 250) newCount = 250 + Math.floor(Math.random() * 10); // Ensure it doesn't drop too low, add some variance
        if (newCount > 550) newCount = 550 - Math.floor(Math.random() * 10); // Ensure it doesn't go too high, add some variance
        return newCount;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if (currentMessageIndex < initialMessagesConfig.length) {
      const config = initialMessagesConfig[currentMessageIndex];
      setIsTyping(true);
      const timer = setTimeout(() => {
        setDisplayedMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}-${currentMessageIndex}`,
            sender: config.sender,
            text: processTextTemplate(config.textTemplate),
            avatar: config.avatar,
          },
        ]);
        setIsTyping(false);
        setCurrentMessageIndex(currentMessageIndex + 1);
      }, config.delay);
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, initialMessagesConfig, processTextTemplate]);

  const handleCtaClick = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    window.open(affiliateLink, '_blank', 'noopener,noreferrer');
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden my-8">
        <div className="p-4 border-b dark:border-gray-700 flex items-center space-x-3">
          <div className="relative">
            <Smile size={36} className="text-pink-500" />
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-gray-800 bg-green-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              {fakeChatInterfaceStrings.assistantNamePrefix} {categoryDisplayName}
            </p>
            <div className="flex items-center space-x-1.5">
              <p className="text-xs text-green-500">{fakeChatInterfaceStrings.statusOnline}</p>
              <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium text-green-600 dark:text-green-400">{onlineUsersCount}</span> {fakeChatInterfaceStrings.usersOnlineSuffix}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 h-80 overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-700/50 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-700/30">
          {displayedMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div className="flex items-end space-x-2 max-w-[80%]">
                {msg.sender === 'bot' && (
                   <div className="flex-shrink-0 h-8 w-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm">
                     {msg.avatar || 'A'}
                   </div>
                )}
                <div
                  className={`px-3 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                 {msg.sender === 'user' && (
                   <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                     {msg.avatar || 'U'}
                   </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-end space-x-2">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm">A</div>
                <div className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-bl-none">
                  <div className="flex space-x-1 items-center">
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                    <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t dark:border-gray-700">
          <Button
            onClick={handleCtaClick}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            disabled={currentMessageIndex < initialMessagesConfig.length} // Disable until all messages are shown
          >
            <MessageSquare size={20} className="mr-2" />
            {processedCtaButtonText}
          </Button>
        </div>
      </div>

      <InterstitialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
        categoryName={categoryDisplayName} // categoryName is dynamic, from props
        cityName={cityDisplayName} // cityName is dynamic, from props
        title={fakeChatInterfaceStrings.modalTitle} // Use translated title
        description={fakeChatInterfaceStrings.modalDescription(categoryDisplayName, cityDisplayName)} // Use translated description
        confirmButtonText={fakeChatInterfaceStrings.modalConfirmButton} // Use translated button text
        warningText={fakeChatInterfaceStrings.modalWarningAdult} // Use translated warning text
      />
    </>
  );
} 