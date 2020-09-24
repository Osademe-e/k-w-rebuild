import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';

// app context
import { AppContext } from '../App';

// hooks
import useFirestore from '../hooks/useFirestore';

// utils
import { errorDisplayHandler } from '../utils/_helpers';

// components
import Loader from './Loader';

const editReplyFormVariants = {
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

const UnfeatureTalent = () => {
  const { modal, toogleModal, toogleToast } = useContext(AppContext);
  const [processing, setProcessing] = useState(false);
  const firestore = useFirestore();

  const UnfeatureATalent = async (id) => {
    setProcessing(true);
    try {
      await firestore.collection('talents').doc(id).update({ featured: false });
      toogleModal({
        open: false,
        component: '',
        featuredTalents: null,
      });
      toogleToast('Talent unfeatured. You can now feature a new talent.');
    } catch (error) {
      toogleToast(errorDisplayHandler(error));
    }
  };

  return (
    <motion.div
      variants={editReplyFormVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="absolute w-full">
      <div className=" w-full lg:w-1/2 lg:mx-auto rounded-t px-2 py-4 bg-white">
        <h1 className="py-2 text-xl font-semibold uppercase">
          Click on the talent you wish to unfeature
        </h1>
        {processing && <Loader />}
        {modal.featuredTalents.map((talent) => (
          <div
            key={talent.id}
            className="flex items-center justify-evenly mt-2 py-2 border-b border-gray-200">
            <img
              src={talent.profile.photo.photoURL}
              alt={talent.profile.fullName}
              className="w-8 h-8 object-cover p-1 rounded-full shadow"
            />
            <p>{talent.profile.fullName}</p>
            <span
              className="cursor-pointer py-1 px-2 text-xs uppercase bg-secondary text-primary-100 rounded"
              onClick={() => UnfeatureATalent(talent.id)}>
              Unfeature
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default UnfeatureTalent;
