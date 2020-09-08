import React, { useState, useContext } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useParams } from 'react-router-dom';
import moment from 'moment';

// context
import { AppContext } from '../App';

const ScoutComments = ({ comments }) => {
  // context
  const { profile, toogleModal, toogleToast } = useContext(AppContext);

  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        <motion.div layout className="shadow rounded bg-white px-2 py-3 mt-4">
          <motion.div layout className="flex justify-between items-center">
            <motion.div layout className="pb-2 border-b border-gray-200">
              <h1 className="uppercase font-semibold text-sm">
                Scout Comments
              </h1>
              {profile?.doc?.role === 'super admin' && comments?.updatedAt && (
                <motion.p className="text-xs opacity-75">
                  Updated:{' '}
                  {moment(
                    comments?.updatedAt?.seconds
                      ? comments?.updatedAt?.toDate()
                      : comments?.updatedAt
                  ).format('DD MMM YY')}
                </motion.p>
              )}
            </motion.div>
          </motion.div>

          {/* body */}
          {(!comments || Object.keys(comments).length === 0) && (
            <motion.div
              layout
              className="p-3 text-center text-xs font-semibold">
              No Comments
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

export default ScoutComments;
