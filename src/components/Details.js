import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

import './styles/Details.css';

// timestamp from config
import { timestamp, increment } from '../config/fbConfig';

// hooks
import useFirestore from '../hooks/useFirestore';
import useFriestoreDoc from '../hooks/useFirestoreDoc';

// app context
import { AppContext } from '../App';

// components
import FormError from './FormError';
import Comment from './Comment';
import Loader from './Loader';

// helper function
import { errorDisplayHandler } from '../utils/_helpers';

// hooks
import useForumComments from '../hooks/useForumComments';

const Details = ({ details, collection }) => {
  const firestore = useFirestore();
  const { user, authLoaded, toogleToast, toogleModal } = useContext(AppContext);
  const location = useLocation();
  const [forumDoc, setForumDoc] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [page, setPage] = useState(null);

  // get comments from firebase
  const { ordered: comments, error, fetching, nextPage } = useForumComments(
    forumDoc,
    10,
    page
  );

  // to show and hide comments
  const handleShowComments = () => {
    if (!forumDoc) {
      setForumDoc(details.id);
    }
    setShowComments((prevState) => !prevState);
  };

  // to show edit comment form
  const editComment = (commentId, body) => {
    toogleModal({
      open: true,
      component: 'edit comment',
      comment: {
        body,
        id: details.id,
        commentId,
      },
    });
  };

  // show add reply form
  const reply = (commentId) => {
    toogleModal({
      open: true,
      component: 'reply',
      reply: {
        id: details.id,
        commentId,
      },
    });
  };

  // delete a comment
  const deleteComment = async (commentObject) => {
    toogleModal({
      open: true,
      component: 'loader',
      message: 'Deleting your comment...',
    });

    try {
      // if replies, delete replies
      if (commentObject.replyCount) {
        const repliesSnapshots = await firestore
          .collection('forum')
          .doc(details.id)
          .collection('comments')
          .doc(commentObject.commentId)
          .collection('replies')
          .get();

        const batch = firestore.batch();

        repliesSnapshots.forEach((doc) => {
          const ref = firestore
            .collection('forum')
            .doc(details.id)
            .collection('comments')
            .doc(commentObject.commentId)
            .collection('replies')
            .doc(doc.id);
          batch.delete(ref);
        });

        await batch.commit();
      }

      // delete comments
      await firestore
        .collection('forum')
        .doc(details.id)
        .collection('comments')
        .doc(commentObject.commentId)
        .delete();

      // update comment count
      await firestore
        .collection('forum')
        .doc(details.id)
        .update({
          commentCount: increment(-1),
        });

      toogleModal({
        open: false,
        component: '',
        message: null,
      });

      toogleToast('Comment deleted.');
    } catch (error) {
      console.log(error);
      toogleModal({
        open: false,
        component: '',
        message: null,
      });
      toogleToast(errorDisplayHandler(error));
    }
  };

  // add comments
  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: yup.object({
      comment: yup.string().required('Required'),
    }),
    onSubmit: async (value, { resetForm, setSubmitting }) => {
      if (!user) {
        setSubmitting(false);
        return toogleToast('Please sign up or sign in to comment.');
      }

      try {
        const comment = {
          comment: value.comment,
          createdAt: timestamp(),
          name: user.displayName,
          id: user.uid,
        };

        await firestore
          .collection('forum')
          .doc(details.id)
          .collection('comments')
          .add(comment);

        await firestore
          .collection('forum')
          .doc(details.id)
          .update({
            commentCount: increment(1),
          });

        resetForm();
      } catch (error) {
        console.log(error);
        toogleToast(errorDisplayHandler(error));
      }
    },
  });

  return (
    <div className="details lg:container mx-auto px-2 lg:px-0 flex text-primary-900">
      <main className="details__main flex-1">
        <figure>
          <img src={details.photoURL} alt="news" className="w-full" />
          <figcaption className="mt-2 py-2 font-semibold">
            {details.subHeadline}.
          </figcaption>
        </figure>
        <div
          dangerouslySetInnerHTML={{ __html: details.body }}
          className="text-sm font-light leading-relaxed mb-4 details__main--body"></div>
        {collection === 'forum' && (
          <div>
            <p className="font-semibold">{`(${
              details?.commentCount || 0
            }) Comments`}</p>
            {authLoaded && !user ? (
              <div className="mt-2 text-xs">
                Wanna comment?{' '}
                <Link
                  to={{
                    pathname: '/register',
                    state: { from: location.pathname },
                  }}
                  className="text-secondary hover:underline">
                  Sign Up
                </Link>{' '}
                or{' '}
                <Link
                  to={{
                    pathname: '/login',
                    state: { from: location.pathname },
                  }}
                  className="text-secondary hover:underline">
                  Log in
                </Link>{' '}
                if you have an account.
              </div>
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                  <label htmlFor="comment" className="label">
                    Comment
                  </label>
                  <textarea
                    name="comment"
                    id="comment"
                    rows="5"
                    className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                    placeholder="example@gmail.com"
                    {...formik.getFieldProps('comment')}></textarea>

                  {formik.touched.comment && formik.errors.comment ? (
                    <FormError error={formik.errors.comment} />
                  ) : null}
                </div>

                <input
                  value={formik.isSubmitting ? 'Submitting...' : 'Submit'}
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="btn bg-secondary text-white text-xs lg:text-sm mx-2"
                />
              </form>
            )}

            <div className="py-3">
              {details?.commentCount ? (
                <>
                  {!showComments && (
                    <div
                      className="text-xs opacity-75 cursor-pointer"
                      onClick={handleShowComments}>
                      Show comments
                    </div>
                  )}
                  {showComments && (
                    <div
                      className="text-xs opacity-75 cursor-pointer"
                      onClick={handleShowComments}>
                      Hide comments
                    </div>
                  )}
                </>
              ) : null}
              {comments && comments.length > 0 && showComments && (
                <>
                  {comments.map((comment, i) => (
                    <div key={comment.commentId} className="m-1">
                      <Comment comment={comment} index={i} />
                      <div className="px-3 text-xs opacity-50">
                        {user && user.uid === comment.id && (
                          <span
                            className="cursor-pointer mr-2"
                            onClick={(e) =>
                              editComment(comment.commentId, comment.comment)
                            }>
                            Edit
                          </span>
                        )}
                        {user && (
                          <span
                            className="cursor-pointer mr-2"
                            onClick={() => reply(comment.commentId)}>
                            Reply
                          </span>
                        )}
                        {user && user.uid === comment.id && (
                          <span
                            className="cursor-pointer mr-2"
                            onClick={() => deleteComment(comment)}>
                            Delete
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {comments.length < details.commentCount && !fetching && (
                    <div
                      className="text-xs opacity-75 cursor-pointer"
                      onClick={(e) => setPage(nextPage)}>
                      Load more comments
                    </div>
                  )}
                </>
              )}
              {!details?.commentCount && (
                <div className="text-xs opacity-75">No comments</div>
              )}
              {fetching && <Loader />}
              {error && <FormError message={errorDisplayHandler(error)} />}
            </div>
          </div>
        )}
      </main>
      <aside className="details__aside hidden lg:block ">hello</aside>
    </div>
  );
};

export default Details;
