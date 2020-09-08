import React from 'react';
import { motion } from 'framer-motion';

// helper
import { pageAnim } from '../utils/_helpers';

const Dashboard = () => {
  return (
    <motion.div
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit">
      Dashboard
    </motion.div>
  );
};

export default Dashboard;
