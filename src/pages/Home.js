import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import moment from 'moment';

// components
import PlayerCard from '../components/PlayerCard';
import Loader from '../components/Loader';
import PageError from '../components/PageError';
import HeroContainer from '../components/HeroContainer';
import LiveCard from '../components/LiveCard';
import FeaturedNewsCard from '../components/FeaturedNewsCard';

// helper
import { pageAnim, errorDisplayHandler } from '../utils/_helpers';

// svg icons
import rightarrow from '../assets/icons/rightarrow.svg';

// hooks
import usePagination from '../hooks/usePagination';

const Home = ({ featuredTalents }) => {
  const [page, setPage] = useState(null);

  // fetch news from firestore
  const { ordered: news, nextPage, error, fetching } = usePagination(
    'news',
    10,
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
      exit="exit"
      className="text-primary-800">
      {/* hero section */}
      <HeroContainer className="hero py-3">
        <div className="lg:container mx-auto px-2 lg:px-0 lg:flex items-center justify-evenly">
          <div className="z-10  flex-1">
            <div className="font-semibold text-xs w-full sm:w-4/6 rounded shadow m-auto py-2 bg-primary-100">
              <LiveCard />
            </div>
          </div>

          <div className="z-10 flex-1 hidden lg:block">
            {!news && <Loader />}
            {news && news.length === 0 && (
              <div className="text-center font-semibold text-primary-100">
                No news
              </div>
            )}
            {news && news.length > 0 && (
              <div className="flex flex-col">
                <FeaturedNewsCard />
              </div>
            )}
          </div>
        </div>
      </HeroContainer>

      {/* Main section */}
      <section className="main lg:flex lg:container mx-auto px-2 lg:px-0">
        {/* Player card */}
        <aside className="featured-talents hidden lg:block">
          {featuredTalents &&
            featuredTalents.map((talent, i) => (
              <PlayerCard key={i} playerInfo={talent} />
            ))}

          {!featuredTalents && <Loader />}
        </aside>
        {/* news section */}
        <main className="news lg:flex-1 lg:px-3 lg:ml-8 lg:border-l-2 lg:border-gray-200">
          <h2 className="my-3 uppercase font-bold">Latest News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {news &&
              news.length > 0 &&
              news.map((n) => (
                <div
                  className="shadow overflow-hidden flex sm:flex-col relative"
                  key={n.id}>
                  <span className="absolute top-0 right-0 text-secondary sm:text-primary-800 sm:shadow text-xs px-2 py-1 z-10 font-semibold  bg-transparent sm:bg-primary-400">
                    {n.category}
                  </span>
                  <div className="w-2/5 sm:w-full">
                    <img
                      src={n?.photos[Object.keys(n?.photos)[0]].photoURL}
                      alt="news"
                      className="transition duration-500 ease-in-out transform hover:scale-105 w-full"
                    />
                  </div>
                  <div className="px-2">
                    <p className="text-xs font-bold py-1 sm:py-4 opacity-50">
                      {moment(n?.createdAt?.toDate()).format('MMMM d YYYY')}
                    </p>
                    <Link
                      to={`/news/${n.id}`}
                      className="font-bold text-xs sm:text-base">
                      {n.headline.length > 50
                        ? n.headline.slice(0, 50) + '...'
                        : n.headline}
                    </Link>
                    <div className=" hidden sm:flex sm:pb-5 sm:pt-8 justify-end">
                      <Link
                        to={`/news/${n.id}`}
                        className="text-secondary text-xs font-semibold sm:py-2 sm:px-4 hover:underline">
                        Find out more
                      </Link>
                      <img src={rightarrow} alt="arrow" className="w-3" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
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
        </main>
      </section>
    </motion.div>
  );
};

export default Home;
