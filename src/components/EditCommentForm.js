import React, { useContext } from 'react';
import { motion } from 'framer-motion';
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

const editCommentsFormVariants = {
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

const EditCommentForm = () => {
  const { modal, toogleModal, user, toogleToast } = useContext(AppContext);

  const firestore = useFirestore();

  const formik = useFormik({
    initialValues: {
      editComment: modal.comment.body,
    },
    validationSchema: yup.object({
      editComment: yup.string().required('Required'),
    }),
    onSubmit: async ({ editComment }, { setSubmitting }) => {
      // make sure value is changed
      if (editComment.trim() === modal.comment.body) {
        setSubmitting(false);
        return toogleModal({
          open: false,
          components: '',
          comment: null,
        });
      }

      try {
        await firestore
          .collection('forum')
          .doc(modal.comment.id)
          .collection('comments')
          .doc(modal.comment.commentId)
          .update({
            comment: editComment,
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
          comment: null,
        });
      } catch (error) {
        setSubmitting(false);
        toogleToast(errorDisplayHandler(error));
      }
    },
  });

  return (
    <motion.div
      variants={editCommentsFormVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="absolute w-full">
      <div className=" w-full lg:w-1/2 lg:mx-auto rounded-t px-2 py-4 bg-white">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-control">
            <label htmlFor="editComment" className="label">
              Edit Comment
            </label>
            <textarea
              name="editComment"
              id="editComment"
              rows="2"
              className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
              placeholder="edit..."
              {...formik.getFieldProps('editComment')}></textarea>

            {formik.touched.editComment && formik.errors.editComment ? (
              <FormError error={formik.errors.editComment} />
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

export default EditCommentForm;
