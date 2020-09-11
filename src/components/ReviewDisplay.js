import React from 'react';
import { motion } from 'framer-motion';

// utils
import {
  trailingZero,
  abilityTextReadable,
  progressColor,
} from '../utils/_helpers';

const ReviewDisplay = ({ review }) => {
  return (
    <motion.div
      layout
      className="bg-gray-800 py-3 rounded text-primary-100 px-2">
      <h1 className="uppercase font-semibold text-xs border-b border-gray-700 pb-2">
        Player Attributes
      </h1>
      <div className="pt-2">
        {review &&
          Object.keys(review).map((ability) =>
            ability !== 'updatedAt' ? (
              <div
                className="flex items-center justify-between text-xs py-3 border-b border-gray-700 mx-1 lg:mx-2"
                key={ability}>
                <p>{`${trailingZero(review[ability])}%`}</p>
                <div
                  className={`flex-1 w-full h-2 bg-${progressColor(
                    review[ability]
                  )}-800 rounded mx-1 overflow-hidden`}>
                  <motion.div
                    initial={{
                      opacity: 0,
                      width: 0,
                    }}
                    animate={{
                      opacity: 1,
                      width: `${trailingZero(review[ability])}%`,
                      transition: {
                        delay: 0.2,
                        duration: 0.5,
                      },
                    }}
                    className={`bg-${progressColor(
                      review[ability]
                    )}-500 h-2 rounded`}></motion.div>
                </div>
                <p>{abilityTextReadable(ability)}</p>
              </div>
            ) : null
          )}

        {(!review || Object.keys(review).length === 0) && (
          <motion.div layout className="p-3 text-center text-xs font-semibold">
            No Review
          </motion.div>
        )}
      </div>
      <div className="text-xs text-center pt-3 border-t border-gray-700 font-hairline opacity-75">
        Player's review is based on Kingsports Analysis™
      </div>
    </motion.div>
  );
};

export default ReviewDisplay;
