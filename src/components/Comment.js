import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import moment from 'moment';

// components
import Loader from './Loader';
import PageError from './PageError';
import Reply from './Reply';

// hooks
import useForumReplies from '../hooks/useForumReplies';

const Comment = ({ comment, index }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [page, setPage] = useState(null);
  const [commentId, setCommentId] = useState(null);

  // get forum id from route
  const { id } = useParams();

  // get replies
  const { ordered: replies, error, nextPage, fetching } = useForumReplies(
    id,
    commentId,
    5,
    page
  );

  // toggle the show replies fields
  const toogleShowReplies = () => {
    if (!commentId) {
      setCommentId(comment.commentId);
    }
    setShowReplies((prevState) => !prevState);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.1 * index } }}
      className="rounded py-3 px-3 bg-white text-sm">
      <p className="text-xs font-semibold">
        {comment.name} .{' '}
        <small className="opacity-75">
          {moment(comment?.createdAt?.toDate()).fromNow()}
        </small>
        {comment.editedBy && <small className="opacity-75"> . Edited</small>}
      </p>
      <div>
        <p className="font-light text-xs">{comment.comment}</p>

        {/* replies for this comment */}
        <div className="ml-3 mt-1">
          <div className="text-xs opacity-75">
            {comment?.replyCount ? (
              <>
                <span className="mr-2">{`(${comment.replyCount}) Replies`}</span>
                {showReplies ? (
                  <span className="cursor-pointer" onClick={toogleShowReplies}>
                    . Hide Replies
                  </span>
                ) : (
                  <span className="cursor-pointer" onClick={toogleShowReplies}>
                    . Show Replies
                  </span>
                )}
              </>
            ) : (
              <span>No Replies</span>
            )}
          </div>
          {/* replies */}
          <div>
            {replies?.length > 0 &&
              showReplies &&
              replies.map((reply, i) => (
                <div key={i}>
                  <Reply
                    reply={reply}
                    commentId={comment.commentId}
                    forumId={id}
                    index={i}
                  />
                </div>
              ))}

            {/* show loader when fetching data */}
            {fetching && <Loader />}
            {/* if any error occurs fetching data */}
            {error && <PageError />}
            {!fetching && replies?.length < comment.replyCount ? (
              <div
                className="text-xs cursor-pointer opacity-75"
                onClick={() => setPage(nextPage)}>
                Show more
              </div>
            ) : null}
          </div>
        </div>
        {comment.re && <div></div>}
      </div>
    </motion.div>
  );
};

export default Comment;
