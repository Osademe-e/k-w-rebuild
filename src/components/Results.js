import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';

// app context
import { AppContext } from '../App';

// hooks
import useQuery from '../hooks/useQuery';
import useStructure from '../hooks/useStructure';

// helper
import { pageAnim, errorDisplayHandler } from '../utils/_helpers';

// components
import HeroContainer from '../components/HeroContainer';
import Loader from '../components/Loader';
import PageError from '../components/PageError';
import Country from '../components/Country';

const Results = () => {
  // app context
  const {
    leagues: { ordered, error, fetching },
  } = useContext(AppContext);

  const query = useQuery();
  const country = query.get('country');
  const league = query.get('league');

  const [pageCount, setPageCount] = useState(() => {
    if (country && league) {
      return 20;
    } else {
      return null;
    }
  });

  const { result, total } = useStructure(
    ordered,
    country,
    league,
    'results',
    pageCount
  );

  return (
    <motion.div
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-primary-600">
      <HeroContainer>
        <h2 className="text-primary-100 font-semibold lg:container mx-auto text-xl lg:text-5xl px-2 lg:px-0 my-6">
          Results
        </h2>
      </HeroContainer>
      <main className="w-full lg:w-1/2 mx-auto px-2 lg:px-0 my-5">
        {result &&
          Object.keys(result).length > 0 &&
          Object.keys(result).map((countryName) => (
            <Country
              key={countryName}
              data={result[countryName]}
              type={'results'}
            />
          ))}
        {result &&
          Object.keys(result).length > 0 &&
          country &&
          league &&
          pageCount < total && (
            <div
              className="text-xs uppercase mt-2 py-2 px-3 rounded hover:shadow cursor-pointer inline-block border border-gray-300 hover:border-0"
              onClick={() => setPageCount((prevState) => prevState + 20)}>
              Load More
            </div>
          )}

        {fetching && <Loader />}
        {error && <PageError message={errorDisplayHandler(error)} />}
      </main>
    </motion.div>
  );
};

export default Results;
