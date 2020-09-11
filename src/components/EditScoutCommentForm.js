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

const EditScoutComment = () => {
  const { modal, toogleModal, user, toogleToast } = useContext(AppContext);

  const firestore = useFirestore();

  const formik = useFormik({
    initialValues: {
      editScoutComment: modal.scoutComment.body,
    },
    validationSchema: yup.object({
      editScoutComment: yup.string().required('Required'),
    }),
    onSubmit: async ({ editScoutComment }, { setSubmitting }) => {
      // make sure value is changed
      if (editScoutComment.trim() === modal.scoutComment.body) {
        setSubmitting(false);
        return toogleModal({
          open: false,
          components: '',
          scoutComment: null,
        });
      }

      try {
        await firestore
          .collection('talents')
          .doc(modal.scoutComment.talentId)
          .update({
            scoutComments: {
              ...modal.scoutComment.comments,
              [user.uid]: {
                comment: editScoutComment,
                updatedAt: timestamp(),
              },
            },
          });

        return toogleModal({
          open: false,
          components: '',
          scoutComment: null,
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
        variants={editScoutCommentFormVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="absolute w-full">
        <div className=" w-full lg:w-1/2 lg:mx-auto rounded-t px-2 py-4 bg-white">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-control">
              <label htmlFor="editScoutComment" className="label">
                Edit Comment
              </label>
              <textarea
                name="editScoutComment"
                id="editScoutComment"
                rows="2"
                className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                placeholder="edit..."
                {...formik.getFieldProps('editScoutComment')}></textarea>

              {formik.touched.editScoutComment &&
              formik.errors.editScoutComment ? (
                <FormError error={formik.errors.editScoutComment} />
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

export default EditScoutComment;
