import React, { useState, useContext } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Link } from 'react-router-dom';

// context
import { AppContext } from '../App';

// config
import { timestamp } from '../config/fbConfig';

// hooks
import useFirestore from '../hooks/useFirestore';
import useFirestoreCollection from '../hooks/useFirestoreCollection';
// Components
import FormError from './FormError';

// helpers
import { errorDisplayHandler } from '../utils/_helpers';

const ScoutComments = ({ comments }) => {
  // states
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  // context
  const { user, profile, toogleModal, toogleToast } = useContext(AppContext);

  // params
  const { id } = useParams();

  // hooks
  const firestore = useFirestore();
  const { data } = useFirestoreCollection(
    comments && Object.keys(comments).length > 0 ? 'scouts' : null
  );
  console.log(data);

  // scout comment form handler
  const scoutCommentForm = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: yup.object({
      comment: yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setError('');
      try {
        await firestore
          .collection('talents')
          .doc(id)
          .update({
            scoutComments: {
              ...comments,
              [user.uid]: {
                ...values,
                updatedAt: timestamp(),
              },
            },
          });
        resetForm();
        setShowForm((prevState) => !prevState);
      } catch (error) {
        setError(errorDisplayHandler(error));
      }
    },
  });

  // delete scout comment
  const deleteScoutComment = async () => {
    toogleModal({
      open: true,
      component: 'loader',
      message: 'Deleting comment...',
    });
    try {
      let update = {
        ...comments,
      };

      delete update[user.uid];

      await firestore.collection('talents').doc(id).update({
        scoutComments: update,
      });

      toogleModal({
        open: false,
        component: '',
        message: null,
      });

      toogleToast('Comment Deleted');
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
    <AnimateSharedLayout>
      <AnimatePresence>
        <motion.div layout className="shadow rounded bg-white px-2 pt-3 mt-4">
          <motion.div layout className="flex justify-between items-center">
            <motion.h1
              layout
              className="uppercase font-semibold text-sm pb-2 border-b border-gray-200">
              Scout Comments
            </motion.h1>

            {user?.uid &&
              profile?.doc?.subscriptions?.scout &&
              !comments?.[user?.uid] &&
              !showForm && (
                <span
                  className="material-icons shadow-lg text-secondary cursor-pointer"
                  onClick={() => setShowForm((prevState) => !prevState)}>
                  add_comment
                </span>
              )}
          </motion.div>

          {/* body */}

          {/* comment form */}

          {showForm && (
            <motion.div
              layout
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: '100%',
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              className="py-3">
              <form onSubmit={scoutCommentForm.handleSubmit}>
                <div className="form-control">
                  <label htmlFor="comment" className="label">
                    Comment
                  </label>
                  <textarea
                    name="comment"
                    id="comment"
                    rows="2"
                    className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                    placeholder="write a comment..."
                    {...scoutCommentForm.getFieldProps('comment')}></textarea>

                  {scoutCommentForm.touched.comment &&
                  scoutCommentForm.errors.comment ? (
                    <FormError error={scoutCommentForm.errors.comment} />
                  ) : null}
                </div>
                {error && <FormError error={error} />}

                <input
                  value={
                    scoutCommentForm.isSubmitting ? 'Submitting...' : 'Submit'
                  }
                  type="submit"
                  disabled={scoutCommentForm.isSubmitting}
                  className="btn bg-secondary text-white text-xs lg:text-sm mx-2"
                />
              </form>
            </motion.div>
          )}

          {/* comments */}

          {comments && (
            <motion.div layout>
              {Object.keys(comments)
                .sort(
                  (a, b) =>
                    +moment(comments[b]?.updatedAt?.toDate()) -
                    +moment(comments[a]?.updatedAt?.toDate())
                )
                .map((scoutId) => (
                  <div key={scoutId} className="py-3 border-b border-gray-200">
                    <div className="flex items-center pb-3">
                      <img
                        src={data?.[scoutId]?.photo?.photoURL}
                        alt="scout pix"
                        className="w-10 h-10 object-cover object-top rounded-full mr-2"
                      />
                      <div className="flex-1">
                        <Link
                          to={`/scouts/${scoutId}`}
                          className="block text-xs font-semibold leading-3">
                          {data?.[scoutId].fullName}
                        </Link>
                        <small className="text-xs opacity-75">
                          {moment(
                            comments?.[scoutId]?.updatedAt?.toDate()
                          ).format('DD MMM YY, H:mm a')}
                        </small>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-100 text-sm">
                      {comments[scoutId].comment}
                    </div>
                    {user?.uid === scoutId && (
                      <div className="flex items-center justify-evenly text-xs border-t border-gray-100 pt-3 mt-3">
                        <span
                          className="material-icons opacity-50 cursor-pointer hover:text-secondary hover:opacity-100"
                          onClick={() =>
                            toogleModal({
                              open: true,
                              component: 'edit scout comment',
                              scoutComment: {
                                body: comments[scoutId].comment,
                                talentId: id,
                                comments,
                              },
                            })
                          }>
                          edit
                        </span>
                        <span
                          className="material-icons opacity-50 cursor-pointer hover:text-red-600 hover:opacity-100"
                          onClick={deleteScoutComment}>
                          delete_forever
                        </span>
                      </div>
                    )}
                  </div>
                ))}
            </motion.div>
          )}

          {(!comments || Object.keys(comments).length === 0) && (
            <motion.div
              layout
              className="p-3 text-center text-xs font-semibold">
              No Comments
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

export default ScoutComments;
