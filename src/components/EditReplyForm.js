import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as yup from 'yup';

// config
import { timestamp } from '../config/fbConfig';

// app context
import { AppContext } from '../App';

// hooks
import useFirestore from '../hooks/useFirestore';

// components
import FormError from './FormError';

// utils
import { errorDisplayHandler } from '../utils/_helpers';

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

const EditReplyForm = () => {
  const { modal, toogleModal, user, toogleToast } = useContext(AppContext);

  const firestore = useFirestore();

  const formik = useFormik({
    initialValues: {
      editReply: modal.reply.text,
    },
    validationSchema: yup.object({
      editReply: yup.string().required('Required'),
    }),
    onSubmit: async ({ editReply }, { setSubmitting }) => {
      // make sure value is changed
      if (editReply.trim() === modal.reply.text) {
        setSubmitting(false);
        return toogleModal({
          open: false,
          components: '',
          reply: null,
        });
      }

      try {
        await firestore
          .collection('forum')
          .doc(modal.reply.forumId)
          .collection('comments')
          .doc(modal.reply.commentId)
          .collection('replies')
          .doc(modal.reply.replyId)
          .update({
            reply: editReply,
            editedBy: {
              name: user.displayName,
              id: user.uid,
              editedAt: timestamp(),
            },
          });

        setSubmitting(false);
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
    <AnimatePresence>
      <motion.div
        variants={editReplyFormVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="absolute w-full">
        <div className=" w-full lg:w-1/2 lg:mx-auto rounded-t px-2 py-4 bg-white">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-control">
              <label htmlFor="editReply" className="label">
                Edit Reply
              </label>
              <textarea
                name="editReply"
                id="editReply"
                rows="2"
                className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                placeholder="edit..."
                {...formik.getFieldProps('editReply')}></textarea>

              {formik.touched.editReply && formik.errors.editReply ? (
                <FormError error={formik.errors.editReply} />
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
    </AnimatePresence>
  );
};

export default EditReplyForm;
