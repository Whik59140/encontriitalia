'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CountdownTimer } from './CountdownTimer';
import { siteHeaderCtasStrings } from '@/app/translations'; // Import translations

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
      className="flex flex-1 shrink-0 items-center justify-center gap-1 rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-2 text-xs font-semibold text-white shadow-md transition-all hover:from-sky-600 hover:to-indigo-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:flex-none sm:w-auto sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm md:px-6 md:py-3 md:text-base"
    >
      <div className="relative h-4 w-4 sm:h-5 sm:w-5 md:h-7 md:w-7">
        <Image src={imageSrc} alt={imageAlt} width={28} height={28} className="h-full w-full object-contain" />
      </div>
      <div className="flex flex-col items-start text-left rtl:text-right sm:flex-row sm:items-center sm:gap-1">
        <span className="whitespace-nowrap leading-tight sm:leading-normal text-sm sm:text-base md:text-lg">{text}</span>
        {discountText && (
          <div className="flex items-center whitespace-nowrap">
            <span className="ml-0.5 rounded bg-amber-400 px-1 py-0.5 text-[10px] font-bold text-slate-900 sm:ml-1 sm:text-xs md:text-sm">
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
  const tenMinutesFromNow = new Date(Date.now() + 10 * 60 * 1000);

  return (
    <div className="sticky top-0 z-[60] flex w-full flex-row flex-wrap items-stretch justify-center gap-2 bg-slate-900/80 p-2 backdrop-blur-md sm:flex-nowrap sm:gap-3 md:gap-4 md:p-3">
      <CtaButton
        href="https://nplink.net/638u88km"
        imageSrc="/penis.webp"
        imageAlt={siteHeaderCtasStrings.penisEnlargementImageAlt}
        text={siteHeaderCtasStrings.penisEnlargementText}
        ariaLabel={siteHeaderCtasStrings.penisEnlargementAria}
        discountText={siteHeaderCtasStrings.discount}
        timerElement={<CountdownTimer targetDate={tenMinutesFromNow} />}
      />
      <CtaButton
        href="https://nplink.net/dc78zw3w"
        imageSrc="/erection.webp"
        imageAlt={siteHeaderCtasStrings.strongerErectionImageAlt}
        text={siteHeaderCtasStrings.strongerErectionText}
        ariaLabel={siteHeaderCtasStrings.strongerErectionAria}
        discountText={siteHeaderCtasStrings.discount}
        timerElement={<CountdownTimer targetDate={tenMinutesFromNow} />}
      />
    </div>
  );
} 