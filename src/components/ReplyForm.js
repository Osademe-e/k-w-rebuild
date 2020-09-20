import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as yup from 'yup';

// config
import { timestamp, increment } from '../config/fbConfig';

// app context
import { AppContext } from '../App';

// hooks
import useFirestore from '../hooks/useFirestore';

// components
import FormError from './FormError';
import { errorDisplayHandler } from '../utils/_helpers';

const replyFormVariants = {
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

const RelpyForm = () => {
  const { modal, toogleModal, user, toogleToast } = useContext(AppContext);

  const firestore = useFirestore();

  const formik = useFormik({
    initialValues: {
      reply: '',
    },
    validationSchema: yup.object({
      reply: yup.string().required('Required'),
    }),
    onSubmit: async ({ reply }, { setSubmitting }) => {
      try {
        const userReply = {
          reply,
          createdAt: timestamp(),
          name: user.displayName,
          id: user.uid,
        };

        // add to comments subcollection
        await firestore
          .collection('forum')
          .doc(modal.reply.id)
          .collection('comments')
          .doc(modal.reply.commentId)
          .collection('replies')
          .add(userReply);

        // increse reply count in comments collection
        await firestore
          .collection('forum')
          .doc(modal.reply.id)
          .collection('comments')
          .doc(modal.reply.commentId)
          .update({
            replyCount: increment(1),
          });

        return toogleModal({
          open: false,
          components: '',
          reply: null,
        });
      } catch (error) {
        setSubmitting(false);
        toogleToast(errorDisplayHandler(error));
      }
    },
  });

  return (
    <motion.div
      variants={replyFormVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="absolute w-full">
      <div className=" w-full lg:w-1/2 lg:mx-auto rounded-t px-2 py-4 bg-white">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-control">
            <label htmlFor="reply" className="label">
              Reply Comment
            </label>
            <textarea
              name="reply"
              id="reply"
              rows="2"
              className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
              placeholder="reply comment..."
              {...formik.getFieldProps('reply')}></textarea>

            {formik.touched.reply && formik.errors.reply ? (
              <FormError error={formik.errors.reply} />
            ) : null}
          </div>

          <input
            value={formik.isSubmitting ? 'Submitting...' : 'Submit'}
            type="submit"
            disabled={formik.isSubmitting}
            className="btn bg-secondary text-white text-xs lg:text-sm mx-2"
          />
        </form>
      </div>
    </motion.div>
  );
};

export default RelpyForm;
