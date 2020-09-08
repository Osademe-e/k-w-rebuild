import React from 'react';
import { motion } from 'framer-motion';

// helper
import { pageAnim } from '../utils/_helpers';

const NotFound = () => {
  return (
    <motion.div
      className="text-6xl"
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit">
      404
    </motion.div>
  );
};

export default NotFound;
