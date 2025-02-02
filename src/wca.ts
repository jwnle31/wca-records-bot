import wretch from 'wretch';
import { Record } from './main.ts';
import { getIcon } from './cubing-icons.ts';

export async function getRecords(): Promise<Record[]> {
  const response = await wretch('https://live.worldcubeassociation.org/api')
    .json({
      query: `query Competitions {
        recentRecords {
          id
          tag
          type
          attemptResult
          result {
            person { name country { name } }
            round { competitionEvent { event { id name } } }
          }
        }
      }`,
    })
    .post()
    .json(
      (j) =>
        j as {
          data: {
            recentRecords: {
              id: string;
              tag: string;
              type: string;
              attemptResult: number;
              result: {
                person: {
                  name: string;
                  country: {
                    name: string;
                  };
                };
                round: {
                  competitionEvent: {
                    event: {
                      name: string;
                      id: string;
                    };
                  };
                };
              };
            }[];
          };
        },
    );

  return response.data.recentRecords
    .filter((r) => r.tag !== 'NR')
    .map((r) => ({
      id: r.id,
      tag: r.tag as 'WR' | 'CR',
      type: r.type as 'single' | 'average',
      time: r.attemptResult / 100,
      person: r.result.person.name,
      country: r.result.person.country.name,
      event: r.result.round.competitionEvent.event.name,
      icon: getIcon(r.result.round.competitionEvent.event.id),
    }));
}
