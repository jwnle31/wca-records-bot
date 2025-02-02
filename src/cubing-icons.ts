// from https://www.npmjs.com/package/@cubing/icons/v/3.0.3?activeTab=code
// ^/dist/lib/@cubing/icons/cubing-icons.woff2 -> /fonts/cubing-icons

// ^/dist/lib/@cubing/icons/js/dist/lib/@cubing/icons/cubing-icons.js
// https://github.com/thewca/wca-live/blob/main/lib/wca_live/wca/event.ex for more accurate names
const icons: Record<string, number> = {
  '333': 61702,
  '222': 61706,
  '444': 61697,
  '555': 61708,
  '666': 61715,
  '777': 61713,
  '333bf': 61703,
  '333fm': 61709,
  '333oh': 61717,
  clock: 61704,
  minx: 61699,
  pyram: 61714,
  skewb: 61701,
  sq1: 61698,
  '444bf': 61700,
  '555bf': 61716,
  '333mbf': 61710,
};

export function getIcon(iconId: string) {
  return String.fromCharCode(icons[iconId]);
}
