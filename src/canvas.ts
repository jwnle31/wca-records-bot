import { Record } from './main.ts';
import { createCanvas, registerFont } from 'canvas';

export function getImage(record: Record): Uint8Array {
  registerFont('./fonts/cubing-icons.ttf', { family: 'cubing-icons' });
  registerFont('./fonts/montserrat.ttf', { family: 'Montserrat' });

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

  ctx.font = '36px Montserrat'; // 2.25 rem
  ctx.fillText(`${record.event} ${record.type} ${record.tag}`, 500, 100);
  ctx.fillText(`by ${record.person}`, 500, 175);

  ctx.font = '224px cubing-icons'; // 14 rem
  ctx.fillText(record.icon, 500, 610);

  ctx.font = '192px Montserrat'; // 12 rem
  ctx.fillText(record.time.toString(), 500, 925);

  // console.log(canvas.toDataURL());
  return canvas.toBuffer();
}
