import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';

// app context
import { AppContext } from '../App';

// components
import HeroContainer from '../components/HeroContainer';
import Loader from '../components/Loader';
import Talent from '../components/Talent';
import PageError from '../components/PageError';

import { pageAnim, errorDisplayHandler } from '../utils/_helpers';

// hooks
import usePagination from '../hooks/usePagination';

const Talents = () => {
  // context
  const { user, profile } = useContext(AppContext);

  const [page, setPage] = useState(null);

  //   fetch news from firestore
  const { ordered: talents, nextPage, error, fetching } = usePagination(
    'talents',
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
          Talents
        </h2>
      </HeroContainer>
      <main className="lg:container mx-auto px-2 lg:px-0 my-5">
        {!talents && <Loader />}
        {talents && (
          <div className="lg:flex lg:container mx-auto px-2 lg:px-0 text-primary-900">
            <div className="lg:flex-1 p-2">
              <h2 className="text-xl font-semibold mb-3">All Talents</h2>
              <table className="table-auto w-full rounded">
                <thead className="text-left">
                  <tr>
                    <th className="px-4 py-2 border">Talents</th>
                    <th className="px-4 py-2 border hidden lg:table-cell">
                      Position
                    </th>
                    <th className="px-4 py-2 border hidden lg:table-cell">
                      Nationality
                    </th>
                    {user && profile?.doc.role && (
                      <th className="px-4 py-2 border">Featured</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {talents.map((talent, i) => (
                    <Talent talent={talent} index={i} key={i} />
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

export default Talents;
