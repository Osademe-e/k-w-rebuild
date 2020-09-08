import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import moment from 'moment';

// components
import PlayerCard from '../components/PlayerCard';
import Loader from '../components/Loader';
import PageError from '../components/PageError';
import HeroContainer from '../components/HeroContainer';

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
        <div className="lg:container mx-auto px-2 lg:px-0 lg:flex items-center justify-around">
          <div className="z-10  flex-1 text-center">
            <div className="flex flex-col font-semibold text-xs w-full sm:w-4/6 rounded shadow m-auto py-2 bg-primary-100">
              <div className="mb-2">
                <h4 className="mb-1">Matchweek 1</h4>
                <h3 className="mb-1">Premier League</h3>
                <p className="font-light">All time are local</p>
                <h3 className="my-2 text-left px-2">
                  {moment().format('dddd D MMMM')}
                </h3>
                <ul>
                  <li className="p-2 border-b border-primary-200 cursor-pointer flex justify-between items-center group transition duration-500 ease-in-out hover:bg-primary-900">
                    <Link
                      to={`/fixtures/id/xyz`}
                      className="flex items-center group-hover:text-primary-100">
                      <span className="uppercase flex mr-2">
                        cry &nbsp;
                        <img
                          src="https://resources.premierleague.com/premierleague/badges/20/t31.png"
                          alt="club logo"
                          className="w-5 h-5"
                        />
                      </span>
                      <span className="border border-primary-300 rounded font-normal p-1">
                        15:00
                      </span>
                      <span className="uppercase flex ml-2">
                        <img
                          src="https://resources.premierleague.com/premierleague/badges/20/t20.png"
                          alt="club logo"
                          className="w-5 h-5"
                        />
                        &nbsp; sou
                      </span>
                    </Link>
                    <Link to={`/fixtures/id/xyz`}>
                      <img src={rightarrow} alt="right arrow" className="w-2" />
                    </Link>
                  </li>
                  <li className="p-2 border-b border-primary-200 cursor-pointer flex justify-between items-center group transition duration-500 ease-in-out hover:bg-primary-900">
                    <Link
                      to={`/fixtures/id/xyz`}
                      className="flex items-center group-hover:text-primary-100">
                      <span className="uppercase flex mr-2">
                        cry &nbsp;
                        <img
                          src="https://resources.premierleague.com/premierleague/badges/20/t31.png"
                          alt="club logo"
                          className="w-5 h-5"
                        />
                      </span>
                      <span className="border border-primary-300 rounded font-normal p-1">
                        15:00
                      </span>
                      <span className="uppercase flex ml-2">
                        <img
                          src="https://resources.premierleague.com/premierleague/badges/20/t20.png"
                          alt="club logo"
                          className="w-5 h-5"
                        />
                        &nbsp; sou
                      </span>
                    </Link>
                    <Link to={`/fixtures/id/xyz`}>
                      <img src={rightarrow} alt="right arrow" className="w-2" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-1">Matchweek 1</h4>
                <h3 className="mb-1">Premier League</h3>
                <p className="font-light">All time are local</p>
                <h3 className="my-2 text-left px-2">
                  {moment().format('dddd D MMMM')}
                </h3>
                <ul>
                  <li className="p-2 border-b border-primary-200 cursor-pointer flex justify-between items-center group transition duration-500 ease-in-out hover:bg-primary-900">
                    <Link
                      to={`/fixtures/id/xyz`}
                      className="flex items-center group-hover:text-primary-100">
                      <span className="uppercase flex mr-2">
                        cry &nbsp;
                        <img
                          src="https://resources.premierleague.com/premierleague/badges/20/t31.png"
                          alt="club logo"
                          className="w-5 h-5"
                        />
                      </span>
                      <span className="border border-primary-300 rounded font-normal p-1">
                        15:00
                      </span>
                      <span className="uppercase flex ml-2">
                        <img
                          src="https://resources.premierleague.com/premierleague/badges/20/t20.png"
                          alt="club logo"
                          className="w-5 h-5"
                        />
                        &nbsp; sou
                      </span>
                    </Link>
                    <Link to={`/fixtures/id/xyz`}>
                      <img src={rightarrow} alt="right arrow" className="w-2" />
                    </Link>
                  </li>
                  <li className="p-2 border-b border-primary-200 cursor-pointer flex justify-between items-center group transition duration-500 ease-in-out hover:bg-primary-900">
                    <Link
                      to={`/fixtures/id/xyz`}
                      className="flex items-center group-hover:text-primary-100">
                      <span className="uppercase flex mr-2">
                        cry &nbsp;
                        <img
                          src="https://resources.premierleague.com/premierleague/badges/20/t31.png"
                          alt="club logo"
                          className="w-5 h-5"
                        />
                      </span>
                      <span className="border border-primary-300 rounded font-normal p-1">
                        15:00
                      </span>
                      <span className="uppercase flex ml-2">
                        <img
                          src="https://resources.premierleague.com/premierleague/badges/20/t20.png"
                          alt="club logo"
                          className="w-5 h-5"
                        />
                        &nbsp; sou
                      </span>
                    </Link>
                    <Link to={`/fixtures/id/xyz`}>
                      <img src={rightarrow} alt="right arrow" className="w-2" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="z-10 flex-1 hidden lg:block">
            {!news && <Loader />}
            {news && news.length === 0 && <div>No news</div>}
            {news && news.length > 0 && (
              <div className="flex flex-col">
                {news
                  .filter((n) => n.featured)
                  .splice(0, 3)
                  .map((n, i) =>
                    i === 0 ? (
                      <div className={`flex flex-1`} key={n.id}>
                        <div className={`overflow-hidden w-1/2`}>
                          <img
                            src={n.photoURL}
                            alt={n.id}
                            className="transition duration-500 ease-in-out transform hover:scale-105 w-full"
                          />
                        </div>
                        <div className="bg-primary-500 flex-1 p-2">
                          <h4 className="font-semibold text-primary-700">
                            {n.category}
                          </h4>
                          <Link
                            to={`/news/${n.id}`}
                            className="font-semibold hover:underline">
                            {n.headline}
                          </Link>
                          <p className="text-xs mt-2">{n.subHeadline}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center" key={n.id}></div>
                    )
                  )}
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
                      src={n.photoURL}
                      alt="news"
                      className="transition duration-500 ease-in-out transform hover:scale-105 w-full"
                    />
                  </div>
                  <div className="px-2">
                    <p className="text-xs font-bold py-1 sm:py-4 opacity-50">
                      {moment(n.createdAt).format('MMMM d YYYY')}
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
