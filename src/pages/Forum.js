import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
        <div className="lg:flex lg:container mx-auto px-2 lg:px-0">
          <div>
            {forum && forum.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 1, easings: ['easeIn'] },
                }}
                className="text-center font-semibold text-lg">
                {' '}
                No news at the moment{' '}
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
          <aside className="hidden lg:block">hello</aside>
        </div>
      </main>
    </motion.div>
  );
};

export default Forum;
