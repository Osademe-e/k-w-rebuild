import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import moment from 'moment';

const Scorers = () => {
  return (
    <>
      {/* scorers */}
      {true && (
        <motion.div layout className="px-2 lg:px-4 py-3 flex justify-evenly">
          <span></span>
          <span className="material-icons">sports_soccer</span>
          <span></span>
        </motion.div>
      )}
    </>
  );
};

export default Scorers;
