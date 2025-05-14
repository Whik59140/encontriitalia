export const AFFILIATE_LINK_KEYS = ['donne', 'ragazze', 'escort', 'milf', 'gay', 'trans', 'trav'] as const;
export type AffiliateCategory = typeof AFFILIATE_LINK_KEYS[number];

export const categoryAffiliateLinks: Record<AffiliateCategory, string> = {
  donne: 'https://t.mbdaad.link/345641/6167?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN',
  ragazze: 'https://t.mbdaad.link/345641/6167?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN',
  escort: 'https://t.mbdaad.link/345641/7346?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN',
  milf: 'https://t.mbdaad.link/345641/4999?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN',
  gay: 'https://t.mbdaad.link/345641/6488?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN',
  trans: 'https://t.mbdaad.link/345641/6497?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN',
  trav: 'https://t.mbdaad.link/345641/6497?bo=2753,2754,2755,2756&popUnder=true&aff_sub5=SF_006OG000004lmDN',
 
};

export const WEBCAM_AFFILIATE_LINK_GAY = 'https://t.acrsmartcam.com/345641/3006/0?bo=2779,2778,2777,2776,2775&po=6533&aff_sub5=SF_006OG000004lmDN';
export const WEBCAM_AFFILIATE_LINK_GENERAL = 'https://t.acrsmartcam.com/345641/4152?bo=2779,2778,2777,2776,2775&popUnder=true&aff_sub5=SF_006OG000004lmDN';

export const MEMBER_XXL_LINK = 'https://nplink.net/638u88km';
export const ERECTION_HELP_LINK = 'https://nplink.net/dc78zw3w';

// Add other constants here if needed 

export const REGISTRATION_OPTIONS: {
  key: AffiliateCategory;
  label: string;
  emoji: string;
  spicyText: string;
  buttonText: string;
}[] = [
  {
    key: 'milf',
    label: 'MILF Mature',
    emoji: '👵��',
    spicyText: 'Scopa MILF Italiane GRATIS! 👵🔥 Accesso XXX! 🔞',
    buttonText: 'Entra nel mondo MILF',
  },
  {
    key: 'donne',
    label: 'Donne Eccitanti',
    emoji: '💃🔥',
    spicyText: 'Scopa Donne Italiane GRATIS! 💃💦 Contenuti Espliciti! 🔞',
    buttonText: 'Scopri le Donne',
  },
  {
    key: 'trans',
    label: 'Trans Sensuali',
    emoji: '⚧️💖',
    spicyText: 'Scopa Trans Italiane GRATIS! ⚧️💖 Video XXX Proibiti! 🔞',
    buttonText: 'Avventure Trans',
  },
 
  {
    key: 'escort',
    label: 'Escort di Lusso',
    emoji: '💎��',
    spicyText: 'Escort Italiane di Lusso! 💎🥂 Incontri Esclusivi! 🔞',
    buttonText: 'Incontra Escort Top',
  },
];



// Add other constants here if needed 