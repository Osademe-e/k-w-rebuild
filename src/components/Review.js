import React, { useState, useContext } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useParams } from 'react-router-dom';
import moment from 'moment';

// context
import { AppContext } from '../App';

const Review = ({ review }) => {
  // context
  const { profile, toogleModal, toogleToast } = useContext(AppContext);

  const [editting, setEditting] = useState(false);
  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        <motion.div layout className="shadow rounded bg-white px-2 py-3">
          <motion.div layout className="flex justify-between items-center">
            <motion.div layout className="pb-2 border-b border-gray-200">
              <h1 className="uppercase font-semibold text-sm">Review</h1>
              {profile?.doc?.role === 'super admin' && review?.updatedAt && (
                <motion.p className="text-xs opacity-75">
                  Updated:{' '}
                  {moment(
                    review?.updatedAt?.seconds
                      ? review?.updatedAt?.toDate()
                      : review?.updatedAt
                  ).format('DD MMM YY')}
                </motion.p>
              )}
            </motion.div>
            {!editting && profile?.doc?.role === 'super admin' && (
              <motion.span
                layout
                className="material-icons shadow-lg text-secondary cursor-pointer"
                onClick={() => setEditting((prevState) => !prevState)}>
                edit
              </motion.span>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

export default Review;
