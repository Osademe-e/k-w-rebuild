import { useEffect, useState } from 'react';

export default (leagues) => {
  const [live, setLive] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (leagues) {
      setFetching(true);
      let prepared = {};

      let filteredLeagues = [];

      leagues.forEach((league) => {
        if (
          league?.fixtures.filter((f) =>
            ['1H', '2H', 'HT', 'ET', 'P'].includes(f?.fixture?.status?.short)
          ).length > 0
        ) {
          filteredLeagues.push(league);
        }
      });

      filteredLeagues.forEach((league) => {
        prepared = {
          ...prepared,
          [league?.country?.name]: {
            ...prepared?.[league?.country?.name],
            ...league?.country,
            leagues: {
              ...prepared?.[league?.country?.name]?.leagues,
              [league?.name]: {
                ...prepared?.[league?.country?.name]?.leagues?.[league?.name],
                id: league?.id,
                name: league?.name,
                year: league?.year,
                logo: league?.logo,
                fixtures: league?.fixtures
                  .filter((f) =>
                    ['1H', '2H', 'HT', 'ET', 'P'].includes(
                      f?.fixture?.status?.short
                    )
                  )
                  .sort(
                    (a, b) => a?.fixture?.timestamp - b?.fixture?.timestamp
                  ),
              },
            },
          },
        };
      });

      setLive(prepared);
      setFetching(false);
    }
  }, [leagues]);

  return { live, fetching };
};
