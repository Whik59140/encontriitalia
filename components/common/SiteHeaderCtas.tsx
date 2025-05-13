'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CountdownTimer } from './CountdownTimer'; // Assuming CountdownTimer.tsx is in the same directory

interface CtaButtonProps {
  href: string;
  imageSrc: string;
  imageAlt: string;
  text: string;
  ariaLabel: string;
  discountText?: string;
  timerElement?: React.ReactNode;
}

function CtaButton({ href, imageSrc, imageAlt, text, ariaLabel, discountText, timerElement }: CtaButtonProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="flex shrink-0 items-center justify-center gap-1 rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 px-2 py-1 text-[10px] font-semibold text-white shadow-md transition-all hover:from-sky-600 hover:to-indigo-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs md:px-5 md:py-2.5 md:text-base"
    >
      <div className="relative h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6">
        <Image src={imageSrc} alt={imageAlt} width={24} height={24} className="h-full w-full object-contain" />
      </div>
      <div className="flex flex-col items-start text-left rtl:text-right sm:flex-row sm:items-center sm:gap-1">
        <span className="whitespace-nowrap leading-tight sm:leading-normal">{text}</span>
        {discountText && (
          <div className="flex items-center whitespace-nowrap">
            <span className="ml-0.5 rounded bg-amber-400 px-1 py-0.5 text-[9px] font-bold text-slate-900 sm:ml-1 sm:text-xs">
              {discountText}
            </span>
            {timerElement}
          </div>
        )}
      </div>
    </Link>
  );
}

export function SiteHeaderCtas() {
  const tenMinutesFromNow = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes in milliseconds

  return (
    <div className="sticky top-0 z-[60] flex w-full flex-row flex-wrap items-center justify-center gap-1 bg-slate-900/80 p-1 backdrop-blur-md sm:flex-nowrap sm:gap-2 md:gap-4 md:p-3">
      <CtaButton
        href="https://nplink.net/638u88km"
        imageSrc="/penis.webp"
        imageAlt="Prodotto per l'ingrandimento del pene"
        text="Più Centimetri? 🍆"
        ariaLabel="Scopri di più sull'aumento delle dimensioni"
        discountText="-40%"
        timerElement={<CountdownTimer targetDate={tenMinutesFromNow} />}
      />
      <CtaButton
        href="https://nplink.net/dc78zw3w"
        imageSrc="/erection.webp"
        imageAlt="Prodotto per il miglioramento dell'erezione"
        text="Erezione Forte? 💪"
        ariaLabel="Scopri di più sul miglioramento dell'erezione"
        discountText="-40%"
        timerElement={<CountdownTimer targetDate={tenMinutesFromNow} />}
      />
    </div>
  );
} 