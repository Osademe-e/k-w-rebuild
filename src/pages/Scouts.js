import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Redirect } from 'react-router-dom';

import { AppContext } from '../App';

// components
import HeroContainer from '../components/HeroContainer';
import Loader from '../components/Loader';
import Scout from '../components/Scout';
import PageError from '../components/PageError';

import { pageAnim, errorDisplayHandler } from '../utils/_helpers';

// hooks
import useFiltersAndPagination from '../hooks/useFiltersAndPagination';

const Scouts = () => {
  const { profile } = useContext(AppContext);
  const [page, setPage] = useState(null);

  // limit
  const limit = 15;

  const {
    ordered: scouts,
    nextPage,
    error,
    fetching,
  } = useFiltersAndPagination(
    'scouts',
    { fieldKey: 'approved', comparismOperator: '==', value: true },
    limit,
    page,
    {
      orderBy: 'createdAt',
      order: 'desc',
    }
  );

  return profile && profile.fetching ? (
    <Loader />
  ) : profile?.doc?.role !== 'super admin' ? (
    <motion.div exit="undefined">
      <Redirect to="/404" />
    </motion.div>
  ) : (
    <motion.div
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit">
      <HeroContainer>
        <h2 className="text-primary-100 font-semibold lg:container mx-auto text-xl lg:text-5xl px-2 lg:px-0 my-6">
          Scouts
        </h2>
      </HeroContainer>
      <main className="lg:container mx-auto px-2 lg:px-0 my-5">
        {!scouts && <Loader />}
        {scouts && (
          <div className="lg:flex lg:container mx-auto px-2 lg:px-0 text-primary-900">
            <div className="lg:flex-1 p-2">
              <h2 className="text-xl font-semibold mb-3">All scouts</h2>
              <table className="table-auto w-full rounded">
                <thead className="text-left">
                  <tr>
                    <th className="px-4 py-2 border">scouts</th>
                    <th className="px-4 py-2 border hidden lg:table-cell">
                      Nationality
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scouts.map((scout, i) => (
                    <Scout scout={scout} index={i} key={i} />
                  ))}
                </tbody>
              </table>
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
          </div>
        )}
      </main>
    </motion.div>
  );
};

export default Scouts;
