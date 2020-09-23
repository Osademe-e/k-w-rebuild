import { useEffect, useState } from 'react';
import moment from 'moment';

const useStructure = (leagues, country, league, type, count = 20) => {
  const [result, setResult] = useState({});
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (leagues) {
      if (type === 'fixtures') {
        if (!country && !league) {
          let prepared = {};

          leagues.forEach((league) => {
            prepared = {
              ...prepared,
              [league?.country?.name]: {
                ...prepared?.[league?.country?.name],
                ...league?.country,
                leagues: {
                  ...prepared?.[league?.country?.name]?.leagues,
                  [league?.name]: {
                    ...prepared?.[league?.country?.name]?.leagues?.[
                      league?.name
                    ],
                    id: league?.id,
                    name: league?.name,
                    year: league?.year,
                    logo: league?.logo,
                    fixtures: league?.fixtures
                      .filter(
                        (f) =>
                          moment(f?.fixture?.date).diff(moment(), 'days') >=
                            1 &&
                          moment(f?.fixture?.date).diff(moment(), 'days') <= 7
                      )
                      .sort(
                        (a, b) => a?.fixture?.timestamp - b?.fixture?.timestamp
                      ),
                  },
                },
              },
            };
          });

          setResult(prepared);
        }
        if (country && !league) {
          let prepared = {};

          leagues
            .filter(
              (league) =>
                league?.country?.name.toLowerCase() === country?.toLowerCase()
            )
            .forEach((league) => {
              prepared = {
                ...prepared,
                [league?.country?.name]: {
                  ...prepared?.[league?.country?.name],
                  ...league?.country,
                  leagues: {
                    ...prepared?.[league?.country?.name]?.leagues,
                    [league?.name]: {
                      ...prepared?.[league?.country?.name]?.leagues?.[
                        league?.name
                      ],
                      id: league?.id,
                      name: league?.name,
                      year: league?.year,
                      logo: league?.logo,
                      fixtures: league?.fixtures
                        .filter(
                          (f) =>
                            moment(f?.fixture?.date).diff(moment(), 'days') >=
                              1 &&
                            moment(f?.fixture?.date).diff(moment(), 'days') <= 7
                        )
                        .sort(
                          (a, b) =>
                            a?.fixture?.timestamp - b?.fixture?.timestamp
                        ),
                    },
                  },
                },
              };
            });

          setResult(prepared);
        }
        if (!country && league) {
          let prepared = {};

          leagues
            .filter((l) => l?.name.toLowerCase() === league.toLowerCase())
            .forEach((league) => {
              prepared = {
                ...prepared,
                [league?.country?.name]: {
                  ...prepared?.[league?.country?.name],
                  ...league?.country,
                  leagues: {
                    ...prepared?.[league?.country?.name]?.leagues,
                    [league.name]: {
                      ...prepared?.[league?.country?.name]?.leagues?.[
                        league?.name
                      ],
                      id: league?.id,
                      name: league?.name,
                      year: league?.year,
                      logo: league?.logo,
                      fixtures: league?.fixtures
                        .filter(
                          (f) =>
                            moment(f?.fixture?.date).diff(moment(), 'days') >=
                              1 &&
                            moment(f?.fixture?.date).diff(moment(), 'days') <= 7
                        )
                        .sort(
                          (a, b) =>
                            a?.fixture?.timestamp - b?.fixture?.timestamp
                        ),
                    },
                  },
                },
              };
            });

          setResult(prepared);
        }
        if (country && league) {
          const data = leagues.filter(
            (l) =>
              l?.country?.name.toLowerCase() === country.toLowerCase() &&
              l?.name.toLowerCase() === league.toLowerCase()
          )[0];

          const prepared = {
            [data?.country?.name]: {
              ...data?.country,
              leagues: {
                [data?.name]: {
                  id: data?.id,
                  name: data?.name,
                  year: data?.year,
                  logo: data?.logo,
                  fixtures: data?.fixtures
                    .slice(0, count)
                    .sort(
                      (a, b) => a?.fixture?.timestamp - b?.fixture?.timestamp
                    ),
                },
              },
            },
          };

          setTotal(data?.fixtures?.length);

          setResult(prepared);
        }
      } else {
        if (!country && !league) {
          let prepared = {};

          leagues.forEach((league) => {
            prepared = {
              ...prepared,
              [league?.country?.name]: {
                ...prepared?.[league?.country?.name],
                ...league?.country,
                leagues: {
                  ...prepared?.[league?.country?.name]?.leagues,
                  [league?.name]: {
                    ...prepared?.[league?.country?.name]?.leagues?.[
                      league?.name
                    ],
                    id: league?.id,
                    name: league?.name,
                    year: league?.year,
                    logo: league?.logo,
                    fixtures: league?.fixtures
                      .filter((f) => f?.fixture?.status?.short === 'FT')
                      .slice(0, 15)
                      .sort(
                        (a, b) => a?.fixture?.timestamp - b?.fixture?.timestamp
                      ),
                  },
                },
              },
            };
          });

          setResult(prepared);
        }
        if (country && !league) {
          let prepared = {};

          leagues
            .filter(
              (league) =>
                league?.country?.name.toLowerCase() === country.toLowerCase()
            )
            .forEach((league) => {
              prepared = {
                ...prepared,
                [league?.country?.name]: {
                  ...prepared?.[league?.country?.name],
                  ...league?.country,
                  leagues: {
                    ...prepared?.[league?.country?.name]?.leagues,
                    [league.name]: {
                      ...prepared?.[league?.country?.name]?.leagues?.[
                        league?.name
                      ],
                      id: league?.id,
                      name: league?.name,
                      year: league?.year,
                      logo: league?.logo,
                      fixtures: league?.fixtures
                        .filter((f) => f?.fixture?.status?.short === 'FT')
                        .slice(0, 15)
                        .sort(
                          (a, b) =>
                            a?.fixture?.timestamp - b?.fixture?.timestamp
                        ),
                    },
                  },
                },
              };
            });

          setResult(prepared);
        }
        if (!country && league) {
          let prepared = {};

          leagues
            .filter((l) => l?.name.toLowerCase() === league.toLowerCase())
            .forEach((league) => {
              prepared = {
                ...prepared,
                [league?.country?.name]: {
                  ...prepared?.[league?.country?.name],
                  ...league?.country,
                  leagues: {
                    ...prepared?.[league?.country?.name]?.leagues,
                    [league.name]: {
                      ...prepared?.[league?.country?.name]?.leagues?.[
                        league.name
                      ],
                      id: league?.id,
                      name: league?.name,
                      year: league?.year,
                      logo: league?.logo,
                      fixtures: league?.fixtures
                        .filter((f) => f?.fixture?.status?.short === 'FT')
                        .slice(0, 15)
                        .sort(
                          (a, b) =>
                            a?.fixture?.timestamp - b?.fixture?.timestamp
                        ),
                    },
                  },
                },
              };
            });

          setResult(prepared);
        }
        if (country && league) {
          const data = leagues.filter(
            (l) =>
              l?.country?.name.toLowerCase() === country.toLowerCase() &&
              l?.name.toLowerCase() === league.toLowerCase()
          )[0];

          const prepared = {
            [data?.country?.name]: {
              ...data?.country,
              leagues: {
                [data?.name]: {
                  id: data?.id,
                  name: data?.name,
                  year: data?.year,
                  logo: data?.logo,
                  fixtures: data?.fixtures
                    .filter((f) => f?.fixture?.status?.short === 'FT')
                    .slice(0, count)
                    .sort(
                      (a, b) => a?.fixture?.timestamp - b?.fixture?.timestamp
                    ),
                },
              },
            },
          };

          setTotal(
            data?.fixtures.filter((f) => f?.fixture?.status?.short === 'FT')
              ?.length
          );

          setResult(prepared);
        }
      }
    }
  }, [leagues, country, league, type, count]);
  return { result, total };
};

export default useStructure;
