import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import '../components/styles/PremiumPost.css';

// context
import { AppContext } from '../App';

// other imports
import logo from '../assets/images/logo svg/Asset 25@100px.svg';
import brand from '../assets/images/logo svg/Asset 19.svg';

// components
import HeroContainer from '../components/HeroContainer';
import Loader from '../components/Loader';
import InfoCard from '../components/InfoCard';
import PageError from '../components/PageError';

import { pageAnim, errorDisplayHandler } from '../utils/_helpers';

// hooks
import useFiltersAndPagination from '../hooks/useFiltersAndPagination';
import useQuery from '../hooks/useQuery';

const Forum = () => {
  const [page, setPage] = useState(null);
  const query = useQuery();
  const history = useHistory();
  const { leagues } = useContext(AppContext);

  const current = query.get('category') ? query.get('category') : 'All';

  // searc check
  const filter = query.get('category')
    ? {
        fieldKey: 'category',
        comparismOperator: '==',
        value: query.get('category').includes('-')
          ? query.get('category').replace('-', ' ')
          : query.get('category'),
      }
    : { fieldKey: null, comparismOperator: null, value: null };

  //   fetch forum from firestore
  const { ordered: forum, nextPage, error, fetching } = useFiltersAndPagination(
    'forum',
    filter,
    15,
    page,
    {
      orderBy: 'createdAt',
      order: 'desc',
    }
  );

  const changeCategory = (e) => {
    const category = e.target.value;
    if (category === 'All') {
      history.push('/forum');
    } else {
      history.push(`/forum?category=${category}`);
    }
  };

  return (
    <motion.div
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit">
      <HeroContainer>
        <h2 className="text-primary-100 font-semibold lg:container mx-auto text-xl lg:text-5xl px-2 lg:px-0 my-6">
          {query.get('category')
            ? query.get('category').includes('-')
              ? query.get('category').replace('-', ' ')
              : query.get('category')
            : 'Forum'}
        </h2>
      </HeroContainer>
      <main className="lg:container mx-auto px-2 lg:px-0 my-5">
        <div>
          <motion.div className="mt-2 mb-4 w-full lg:w-1/2 mx-auto rounded border">
            <motion.div
              layout
              className="flex items-center justify-between py-2 px-2 premium-header text-primary-100">
              <img src={brand} alt="brand name" className="w-20" />
              <img src={logo} alt="logo" className="w-10 h-10" />
            </motion.div>
            <motion.div
              layout
              className="px-2 flex justify-between items-center py-3">
              <div className="mr-1 flex-1 text-sm font-semibold">Category</div>
              <div className="relative flex-1">
                <select
                  className="input-field"
                  id="category"
                  value={current}
                  onChange={changeCategory}>
                  <option>All</option>
                  <option>General</option>
                  <option>Transfer News</option>
                  <option>Italian Seria A</option>
                  <option>German Bundesliga</option>
                  {leagues?.ordered?.map((league) => (
                    <option key={league.id} value={league.name}>
                      {league.name === 'Primera Division'
                        ? 'Spanish La liga'
                        : league.name}
                    </option>
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

          {forum && forum.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 1, easings: ['easeIn'] },
              }}
              className="text-center font-semibold text-lg">
              {' '}
              No forum post at the moment
            </motion.div>
          ) : (
            <InfoCard info={forum} collection="forum" />
          )}
          <div className="mt-8 text-center">
            {!fetching && (
              <span
                className="text-xs mt-3 border border-primary-900 hover:shadow inline-block uppercase py-2 px-3 rounded cursor-pointer"
                onClick={(e) => setPage(nextPage)}>
                Load More
              </span>
            )}
            {fetching && <Loader />}
            {error && <PageError message={errorDisplayHandler(error)} />}
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Forum;
