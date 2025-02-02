import { Record } from './main.ts';
import { createCanvas, Fonts } from 'canvas';

export async function getImage(record: Record): Promise<Uint8Array> {
  const cubingIcons = await Deno.readFile('./fonts/cubing-icons.woff2');
  Fonts.register(cubingIcons);

  const montserrat = await Deno.readFile('./fonts/montserrat.ttf');
  Fonts.register(montserrat);

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

  ctx.font = '2.25rem Montserrat';
  ctx.fillText(`${record.event} ${record.type} ${record.tag}`, 500, 100);
  ctx.fillText(`by ${record.person}`, 500, 175);

  ctx.font = '14rem cubing-icons';
  ctx.fillText(record.icon, 500, 610);

  ctx.font = '12rem Montserrat';
  ctx.fillText(record.time.toString(), 500, 925);

  // canvas.save('image.png');
  return canvas.encode();
}
