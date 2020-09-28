import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import '../components/styles/PremiumPost.css';

// other imports
import logo from '../assets/images/logo svg/Asset 25@100px.svg';
import brand from '../assets/images/logo svg/Asset 19.svg';

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

const Fixtures = () => {
  const history = useHistory();
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
    'fixtures',
    pageCount
  );

  const changeCategory = (e) => {
    const league = e.target.value;
    if (league === 'All') {
      history.push(`/fixtures`);
    } else {
      history.push(`/fixtures?league=${league}`);
    }
  };

  return (
    <motion.div
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-primary-600">
      <HeroContainer>
        <h2 className="text-primary-100 font-semibold lg:container mx-auto text-xl lg:text-5xl px-2 lg:px-0 my-6">
          Fixtures
        </h2>
      </HeroContainer>
      <main className="w-full lg:w-1/2 mx-auto px-2 lg:px-0 my-5">
        <motion.div className="mt-2 mb-4 w-full rounded border">
          <motion.div
            layout
            className="flex items-center justify-between py-2 px-2 premium-header text-primary-100">
            <img src={brand} alt="brand name" className="w-20" />
            <img src={logo} alt="logo" className="w-10 h-10" />
          </motion.div>
          <motion.div
            layout
            className="px-2 flex justify-between items-center py-3">
            <div className="mr-1 flex-1 text-sm font-semibold">League</div>
            <div className="relative flex-1">
              <select
                className="input-field"
                id="category"
                value={league ? league : 'All'}
                onChange={changeCategory}>
                <option>All</option>
                {ordered?.map((league) => (
                  <option key={league.id}>{league.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {result &&
          Object.keys(result).length > 0 &&
          Object.keys(result).map((countryName) => (
            <Country key={countryName} data={result[countryName]} />
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

export default Fixtures;
