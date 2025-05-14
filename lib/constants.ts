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
  imageSrc: string;
  spicyText: string;
  buttonText: string;
  onlineMembersMin: number;
  onlineMembersMax: number;
}[] = [
  {
    key: 'milf',
    label: 'MILF Mature',
    imageSrc: '/blog/milf/7.webp',
    spicyText: 'Scopa MILF Italiane GRATIS! 👵🔥 Accesso XXX! 🔞',
    buttonText: '➡️ Clicca Qui per MILF! 👵',
    onlineMembersMin: 200,
    onlineMembersMax: 300,
  },
  {
    key: 'donne',
    label: 'Donne Eccitanti',
    imageSrc: '/blog/donne/donne (34).webp',
    spicyText: 'Scopa Donne Italiane GRATIS! 💃💦 Contenuti Espliciti! 🔞',
    buttonText: '➡️ Clicca Qui per Donne! 🍑',
    onlineMembersMin: 1100,
    onlineMembersMax: 1300,
  },
  {
    key: 'gay',
    label: 'Gay Appassionati',
    imageSrc: '/blog/gay/gay (12).webp',
    spicyText: 'Incontri Gay Esplosivi GRATIS! 👨‍❤️‍💋‍👨🔥 Video e Chat! 🔞',
    buttonText: '➡️ Clicca Qui per Gay! 👨‍❤️‍💋‍👨',
    onlineMembersMin: 400,
    onlineMembersMax: 500,
  },
  {
    key: 'trans',
    label: 'Trans Sensuali',
    imageSrc: '/blog/trans/trans (2).webp',
    spicyText: 'Scopa Trans Italiane GRATIS! ⚧️💖 Video XXX Proibiti! 🔞',
    buttonText: '➡️ Clicca Qui per Trans! ⚧️',
    onlineMembersMin: 200,
    onlineMembersMax: 300,
  },
];



// Add other constants here if needed 