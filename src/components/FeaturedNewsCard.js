import React from 'react';
import { Link } from 'react-router-dom';

// hooks
import useFiltersAndPagination from '../hooks/useFiltersAndPagination';
import PageError from './PageError';
import { errorDisplayHandler } from '../utils/_helpers';
import Loader from './Loader';

const FeaturedNewsCard = () => {
  const { ordered, fetching, error } = useFiltersAndPagination(
    'news',
    {
      fieldKey: 'featured',
      comparismOperator: '==',
      value: true,
    },
    3,
    null,
    {
      orderBy: 'createdAt',
      order: 'desc',
    }
  );

  const [mostRecent, ...rest] = ordered || [];

  return (
    <div>
      {ordered && ordered.length > 0 && (
        <div className="flex flex-col text-left">
          <div className="flex-1 mb-1 flex items-center bg-primary-500">
            <img
              className="w-1/2 h-1/2 block object-cover"
              src={
                mostRecent.photos[Object.keys(mostRecent.photos)[0]].photoURL
              }
              alt="news pix"
            />
            <div className="p-2">
              <p>
                <Link
                  to={`news?league=${mostRecent.category}`}
                  className="text-secondary font-semibold text-sm hover:underline">
                  {mostRecent.category}
                </Link>
              </p>
              <h1 className="font-semibold">
                <Link to={`news/${mostRecent.id}`} className="hover:underline">
                  {mostRecent.headline}
                </Link>
              </h1>
              <h5 className="text-xs">{mostRecent.subHeadline}</h5>
            </div>
          </div>
          <div>
            {rest.map((news) => (
              <div
                className="flex items-center bg-primary-500 mt-1"
                key={news.id}>
                <img
                  className="w-1/4 block object-cover"
                  src={news.photos[Object.keys(news.photos)[0]].photoURL}
                  alt="news pix"
                />
                <div className="p-2">
                  <p>
                    <Link
                      to={`news?league=${news.category}`}
                      className="text-secondary font-semibold text-sm hover:underline">
                      {news.category}
                    </Link>
                  </p>
                  <h1 className="font-semibold">
                    <Link to={`news/${news.id}`} className="hover:underline">
                      {news.headline}
                    </Link>
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {ordered && ordered.length === 0 && (
        <div className="text-center font-semibold text-primary-100">
          No news
        </div>
      )}
      {fetching && <Loader />}
      {error && <PageError message={errorDisplayHandler(error)} />}
    </div>
  );
};

export default FeaturedNewsCard;
