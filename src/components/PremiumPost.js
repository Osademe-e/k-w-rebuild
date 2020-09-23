import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import moment from 'moment';
import './styles/PremiumPost.css';

// context
import { AppContext } from '../App';

// hooks
import useFirestore from '../hooks/useFirestore';

// helper
import { errorDisplayHandler } from '../utils/_helpers';

// component
import Content from './Content';

const PremiumPost = ({ post }) => {
  const { user, profile, toogleModal, toogleToast } = useContext(AppContext);

  const firestore = useFirestore();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const deletePremiumPost = async (id) => {
    toogleModal({
      open: true,
      component: 'loader',
      message: 'Deleting...',
    });

    try {
      await firestore.collection('premium').doc(id).delete();
      toogleModal({
        open: false,
        component: '',
        message: null,
      });
      toogleToast('Deleted.');
    } catch (error) {
      toogleModal({
        open: false,
        component: '',
        message: null,
      });
      toogleToast(errorDisplayHandler(error));
    }
  };

  return (
    <motion.div
      layout
      className="rounded shadow bg-white my-2 text-primary-900 cursor-pointer overflow-hidden"
      onClick={toggleOpen}>
      <motion.div
        layout
        className="flex items-center justify-between py-2 border-b border-gray-300 px-2 premium-header text-primary-100">
        <h1 className="font-semibold text-primary-900">{post.league}</h1>
        <small>{moment(post.createdAt.toDate()).format('DD/MM/YYYY')}</small>
      </motion.div>
      <motion.div layout className="px-2 flex items-center py-3 border-b">
        <motion.div layout className="flex-1 flex items-center justify-evenly">
          <div className="text-center">
            <h2 className="text-sm font-semibold">{post.homeTeam}</h2>
            <small className="text-xs">Home</small>
          </div>
          <div className="text-center">vs</div>
          <div className="text-center">
            <h2 className="text-sm font-semibold">{post.awayTeam}</h2>
            <small className="text-xs">Away</small>
          </div>
        </motion.div>
        <motion.div layout className="px-3 border-l text-xs font-semibold">
          {post.result}
        </motion.div>
      </motion.div>
      {user && profile?.doc.role === 'super admin' && (
        <motion.div layout className="p-2 flex items-center text-xs">
          <span
            className="material-icons mr-2 text-gray-600 cursor-pointer opacity-75 hover:opacity-100 hover:text-secondary"
            onClick={() =>
              toogleModal({
                open: true,
                component: 'edit premium post',
                premium: post,
              })
            }>
            edit
          </span>
          <span
            className="material-icons text-gray-600 cursor-pointer opacity-75 hover:opacity-100 hover:text-red-600"
            onClick={() => deletePremiumPost(post.id)}>
            delete
          </span>
        </motion.div>
      )}
      <AnimatePresence>
        {isOpen && <Content body={post.body} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default PremiumPost;
