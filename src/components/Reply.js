import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import moment from 'moment';

// config
import { increment } from '../config/fbConfig';

// app context
import { AppContext } from '../App';

// hooks
import useFirestore from '../hooks/useFirestore';

// utils
import { errorDisplayHandler } from '../utils/_helpers';

const Reply = ({ reply, index, commentId, forumId }) => {
  const { user, toogleModal, toogleToast } = useContext(AppContext);

  const firestore = useFirestore();

  //   show edit reply form
  const showEditReplyForm = (replyText, replyId) => {
    toogleModal({
      open: true,
      component: 'edit reply',
      reply: {
        text: replyText,
        replyId,
        commentId,
        forumId,
      },
    });
  };

  //   delete reply
  const deleteReply = async (replyId) => {
    toogleModal({
      open: true,
      component: 'loader',
      message: 'Deleting your reply...',
    });

    try {
      await firestore
        .collection('forum')
        .doc(forumId)
        .collection('comments')
        .doc(commentId)
        .collection('replies')
        .doc(replyId)
        .delete();

      await firestore
        .collection('forum')
        .doc(forumId)
        .collection('comments')
        .doc(commentId)
        .update({
          replyCount: increment(-1),
        });

      toogleModal({
        open: false,
        component: '',
        message: null,
      });

      toogleToast('Reply deleted.');
    } catch (error) {
      toogleToast(errorDisplayHandler(error));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.1 * index } }}
      className="my-1">
      <div className="bg-gray-100 p-1">
        <p className="text-xs font-semibold">
          {reply.name} .{' '}
          <small className="opacity-75">
            {moment(reply?.createdAt?.toDate()).fromNow()}
          </small>
          {reply.editedBy && <small className="opacity-75"> . Edited</small>}
        </p>
        <div className="text-xs">{reply.reply}</div>
      </div>
      {user && user.uid === reply.id && (
        <div className="text-xs">
          <span
            className="opacity-75 cursor-pointer mr-1"
            onClick={() => showEditReplyForm(reply.reply, reply.replyId)}>
            Edit
          </span>
          <span
            className="opacity-75 cursor-pointer"
            onClick={() => deleteReply(reply.replyId)}>
            Delete
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default Reply;
