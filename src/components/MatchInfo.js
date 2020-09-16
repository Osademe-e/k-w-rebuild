import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// app context
import { AppContext } from '../App';

const editScoutCommentFormVariants = {
  hidden: {
    opacity: 0,
    bottom: -100,
  },
  visible: {
    opacity: 1,
    bottom: 0,
    transition: {
      delay: 0.2,
      duration: 0.1,
    },
  },
};

const MatchInfo = () => {
  const { modal } = useContext(AppContext);
  console.log(modal);

  return (
    <AnimatePresence>
      <motion.div
        variants={editScoutCommentFormVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="absolute w-full">
        <div className=" w-full lg:w-1/2 lg:mx-auto rounded-t px-2 py-4 bg-white">
          hello
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MatchInfo;
