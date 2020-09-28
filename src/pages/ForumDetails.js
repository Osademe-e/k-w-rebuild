import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import moment from 'moment';

// components
import HeroContainer from '../components/HeroContainer';
import Details from '../components/Details';
import PageError from '../components/PageError';
import Loader from '../components/Loader';

// hooks
import useFirestoreDoc from '../hooks/useFirestoreDoc';

// helper function
import { pageAnim, errorDisplayHandler } from '../utils/_helpers';

const ForumDetails = () => {
  const { id } = useParams();

  const { doc, error, fetching } = useFirestoreDoc('forum', id);

  return (
    <motion.div
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit">
      <HeroContainer>
        <div className="text-primary-100 font-semibold lg:container mx-auto text-xl lg:text-5xl px-2 lg:px-0 mb-6 lg:mb-10">
          {!doc && fetching && <Loader />}
          {doc && (
            <>
              <span className="p-2 bg-primary-500 text-primary-900 text-xs lg:text-sm rounded">
                {doc.category}
              </span>
              <h2 className="mt-3 text-sm lg:text-xl">{doc.headline}</h2>
              <small className="p-2 bg-primary-500 text-primary-900 text-xs rounded">
                Posted:{' '}
                {moment(doc?.createdAt?.toDate()).format('ddd MMM YYYY')} by{' '}
                {doc?.createdBy?.name.split(' ')[1].toUpperCase()}
              </small>
            </>
          )}
        </div>
      </HeroContainer>
      {!doc && fetching && <Loader />}
      {doc && <Details details={doc} collection="forum" />}
      {!doc && error && <PageError message={errorDisplayHandler(error)} />}
    </motion.div>
  );
};

export default ForumDetails;
