import { getImage } from './canvas.js';

// console.log((await getRecords())[0]);
const img = getImage({
  id: '3242991-average',
  tag: 'WR',
  type: 'average',
  time: 8.03,
  person: 'Nicholas Archer Long Name',
  country: 'United Kingdom',
  event: '3x3x3 One-Handed',
  icon: '\uf11f',
});

// await Deno.writeFile('./image.png', img);
