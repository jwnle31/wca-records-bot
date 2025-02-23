import { Record } from './main.js';
import { createCanvas, registerFont } from 'canvas';
import path from 'path';

export function getImage(record: Record): Uint8Array {
  registerFont(path.join(process.cwd(), 'fonts', 'cubing-icons.ttf'), { family: 'cubing-icons' });
  registerFont(path.join(process.cwd(), 'fonts', 'montserrat.ttf'), { family: 'Montserrat' });

  const canvas = createCanvas(1000, 1000);
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 1000, 1000);

  if (record.tag === 'WR') {
    gradient.addColorStop(0, '#ec003f');
    gradient.addColorStop(0.5, '#ff6467');
  } else {
    gradient.addColorStop(0.5, '#51a2ff');
    gradient.addColorStop(1, '#00a6f4');
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1000, 1000);

  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';

  ctx.font = '48px Montserrat';
  ctx.fillText(`${record.event} ${record.type} ${record.tag}`, 500, 100);
  ctx.fillText(`by ${record.person}`, 500, 175);

  ctx.font = '256px cubing-icons';
  ctx.fillText(record.icon, 500, 610);

  ctx.font = '224px Montserrat';
  ctx.fillText(record.time.toString(), 500, 925);

  return canvas.toBuffer('image/png');
}
