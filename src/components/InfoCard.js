import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

// svg icons
import rightarrow from '../assets/icons/rightarrow.svg';

const InfoCard = ({ info, collection }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:flex-1">
      {info &&
        info.length > 0 &&
        info.map((n) => (
          <div
            className="shadow overflow-hidden flex sm:flex-col relative"
            key={n.id}>
            <span className="absolute top-0 right-0 hidden md:inline text-secondary sm:text-primary-800 sm:shadow text-xs px-2 py-1 z-10 font-semibold  bg-transparent sm:bg-primary-400">
              {n.category === 'Primera Division'
                ? 'Spanish La liga'
                : n.category}
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
                {moment(n?.createdAt.toDate()).format('MMMM DD YYYY')}
              </p>
              <Link
                to={{
                  pathname: `/${collection}/${n.id}`,
                }}
                className="font-bold text-xs sm:text-base">
                {n.headline.length > 50
                  ? n.headline.slice(0, 50) + '...'
                  : n.headline}
              </Link>
              {collection === 'forum' && (
                <p className="text-xs opacity-75">
                  {n.commentCount ? n.commentCount : '0'} Comments
                </p>
              )}
              <div className=" hidden sm:flex sm:pb-5 sm:pt-8 justify-end">
                <Link
                  to={{
                    pathname: `/${collection}/${n.id}`,
                  }}
                  className="text-secondary text-xs font-semibold sm:py-2 sm:px-4 hover:underline">
                  Find out more
                </Link>
                <img src={rightarrow} alt="arrow" className="w-3" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default InfoCard;
