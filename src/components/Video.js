import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useParams } from 'react-router-dom';

// App context
import { AppContext } from '../App';

const Video = ({ video, deleteVideo, videoId }) => {
  const { user } = useContext(AppContext);
  //   get talent id
  const { id } = useParams();

  return (
    <motion.div layout className="pt-5 pb-2 border-b border-gray-200">
      <motion.video layout src={video.videoURL} controls className="mb-3" />
      <motion.div layout className="text-xs flex items-center justify-between">
        <div>
          <motion.p layout className="flex-1 font-semibold">
            {video.caption}
          </motion.p>
          <small>Uploaded: {moment(video?.updatedAt).fromNow()}</small>
        </div>
        {user.uid === id && (
          <span
            className="material-icons shadow-lg text-red-600 cursor-pointer"
            onClick={() => deleteVideo(videoId)}>
            delete_forever
          </span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Video;
