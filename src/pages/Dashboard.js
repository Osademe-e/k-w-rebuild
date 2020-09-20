import React, { useContext } from 'react';
import { motion } from 'framer-motion';

// app context
import { AppContext } from '../App';

// helper
import { pageAnim } from '../utils/_helpers';

// components
import HeroContainer from '../components/HeroContainer';
import RegularProfile from '../components/RegularProfile';
import AdminPanel from '../components/AdminPanel';

const Dashboard = () => {
  const { profile } = useContext(AppContext);

  return (
    <motion.div
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-primary-900">
      <HeroContainer>
        <h1 className="text-xl lg:text-5xl font-semibold px-8 my-6 text-primary-100">
          Dashboard
        </h1>
      </HeroContainer>
      <div
        className={`lg:container mx-auto px-2 lg:px-0 py-4 ${
          profile?.doc?.role === 'super admin' ? 'lg:flex' : 'w-full lg:w-1/2'
        }`}>
        <RegularProfile />
        {profile?.doc?.role === 'super admin' && <AdminPanel />}
      </div>
    </motion.div>
  );
};

export default Dashboard;
