import 'dotenv';
import { AtpAgent } from 'atproto';
import { getRecords } from './wca.ts';
import { getImage } from './canvas.ts';

const agent = new AtpAgent({ service: 'https://bsky.social' });
await agent.login({ identifier: 'wca.voytxt.com', password: Deno.env.get('BSKY_PASSWORD')! });
console.log('logged into bsky');

let prevIds = await getRecords().then((rs) => rs.map((r) => r.id));
console.log('fetched', prevIds.length, 'starting records');

Deno.cron('new post', { minute: { every: 10 } }, async () => {
  console.log('new cron cycle');

  console.log(`refetching records (prev record count: ${prevIds.length})`);
  const newRecords = await getRecords();

  for await (const record of newRecords.filter((r) => !prevIds.includes(r.id))) {
    console.log('new record in', record.event);

    console.log('generating image');
    const image = getImage(record);

    console.log('uploading image');
    const {
      data: { blob },
    } = await agent.uploadBlob(image);

    console.log('posting');
    await agent.post({
      text: `${record.person} from ${record.country} set a new ${record.tag} in ${record.event} ${record.type} of ${record.time}!`,
      embed: {
        $type: 'app.bsky.embed.images',
        images: [
          {
            image: blob,
            alt: `${record.event} ${record.type} ${record.tag} by ${record.person}; ${record.time}`,
            aspectRatio: { width: 1000, height: 1000 },
          },
        ],
      },
    });

    console.log('done');
  }

  prevIds = newRecords.map((r) => r.id);
});

export type Record = {
  id: string;
  tag: 'WR' | 'CR';
  type: 'single' | 'average';
  time: number;
  person: string;
  country: string;
  event: string;
  icon: string;
};
