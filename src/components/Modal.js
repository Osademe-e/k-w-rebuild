import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// context
import { AppContext } from '../App';

// animation
const modalAnim = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const Modal = ({ children }) => {
  const { modal, toogleModal } = useContext(AppContext);

  const close = (e) => {
    if (modal.component !== 'loader') {
      if (e.target.classList.contains('modal')) {
        toogleModal({
          open: false,
          component: '',
          message: null,
          comment: null,
          reply: null,
        });
      }
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        className="modal fixed top-0 right-0 left-0 bottom-0"
        onClick={close}
        style={{ background: 'rgba(0,0,0,0.5)' }}
        variants={modalAnim}
        initial="hidden"
        animate="visible"
        exit="hidden">
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
