import React, { useContext, useState } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import moment from 'moment';
import { useParams } from 'react-router-dom';

// App context
import { AppContext } from '../App';

// hooks
import useFirestore from '../hooks/useFirestore';
import useStorage from '../hooks/useStorage';

// components
import Video from './Video';
import FormError from './FormError';

// helper
import { fileChecker, errorDisplayHandler } from '../utils/_helpers';

// video poster
import poster from '../assets/images/loading.gif';

const Videos = ({ stats }) => {
  const { user, toogleModal, toogleToast } = useContext(AppContext);

  //   hooks
  const firestore = useFirestore();
  const storage = useStorage();

  //   get talent id
  const { id } = useParams();

  // videos handler
  const [video, setVideo] = useState(null);
  const [tempVideoSrc, setTempVideoSrc] = useState(null);
  const [videoError, setVideoError] = useState('');
  const [videoName, setVideoName] = useState('');
  const [showVideoForm, setShowVideoForm] = useState(false);

  // video caption
  const [videoCaption, setVideoCaption] = useState('');
  const [captionChar, setCationChar] = useState(500);

  const toggleAddVideo = (e) => {
    setVideo(null);
    setTempVideoSrc(null);
    setVideoError('');
    setVideoName('');
    setVideoCaption('');
    setCationChar(500);
    setShowVideoForm((prevState) => !prevState);
  };

  const handleVideoInput = (e) => {
    setVideoError('');
    const file = e.target.files[0];

    if (file) {
      const validateFile = fileChecker(file, 51000000, [
        'video/mp4',
        'video/mpeg',
      ]);

      if (validateFile.response) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (ev) => {
          // The file reader gives us an ArrayBuffer:
          let buffer = ev.target.result;
          setTempVideoSrc((prev) => buffer);
        };

        setVideo(file);
        setVideoName(file.name);
      } else {
        setTempVideoSrc('');
        setVideoError(validateFile.message);
      }
    } else {
      setVideoError('Please select a video');
      setTempVideoSrc('');
      setVideo(null);
      setVideoName('');
    }
  };

  // add video
  const addVideo = async () => {
    toogleModal({
      open: true,
      component: 'loader',
      message: 'Uploading video...',
    });

    if (video) {
      // upload photos and videos
      try {
        // prepare request
        const dir = 'videos/talents';

        const fileType = video.type.split('/')[1];

        const fileName = `${
          Math.floor(Math.random() * 1e16) + Date.now()
        }.${fileType}`;

        const fileRef = storage.ref().child(`${dir}/${fileName}`);

        // upload new video
        let uploadTask = await fileRef.put(video);

        let downloadUrl = await uploadTask.ref.getDownloadURL();

        let update = {
          ...stats,
          videos: {
            ...stats.videos,
            [uploadTask.metadata.name.split('.')[0]]: {
              caption: videoCaption,
              videoURL: downloadUrl,
              path: uploadTask.metadata.fullPath,
              updatedAt: uploadTask.metadata.timeCreated,
            },
          },
        };

        // update firestore
        await firestore.collection('talents').doc(id).update({ stats: update });

        setVideo(null);
        setTempVideoSrc(null);
        setVideoError('');
        setVideoName('');
        setVideoCaption('');
        setCationChar(500);
        setShowVideoForm((prevState) => !prevState);
        toogleModal({
          open: false,
          component: '',
          message: null,
        });
        return toogleToast('Video Uploaded.');
      } catch (error) {
        toogleModal({
          open: false,
          component: '',
          message: null,
        });
        setVideoError(errorDisplayHandler(error));
        return toogleToast(errorDisplayHandler(error));
      }
    } else {
      setVideoError('Please select a video');
    }
  };

  //   delete a video
  const deleteVideo = async (videoId) => {
    toogleModal({
      open: true,
      component: 'loader',
      message: 'Deleting video...',
    });

    try {
      await storage.ref().child(stats.videos[videoId].path).delete();
      const videos = {
        ...stats.videos,
      };
      delete videos[videoId];

      const update = {
        ...stats,
        videos: {
          ...videos,
        },
      };

      // update firestore
      await firestore.collection('talents').doc(id).update({
        stats: update,
      });

      toogleModal({
        open: false,
        component: '',
        message: null,
      });
      toogleToast('Video Deleted.');
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

  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        <motion.div layout className="shadow rounded bg-white px-2 py-3">
          <motion.div layout className="flex justify-between items-center">
            <motion.h1
              layout
              className="uppercase font-semibold text-sm pb-2 border-b border-gray-200">
              Videos
            </motion.h1>
            {!showVideoForm &&
              user?.uid === id &&
              Object.keys(stats.videos).length < 5 && (
                <motion.span
                  layout
                  className="material-icons shadow-lg text-secondary cursor-pointer"
                  onClick={() => setShowVideoForm((prevState) => !prevState)}>
                  add
                </motion.span>
              )}
          </motion.div>

          {/* add Video */}
          {showVideoForm && (
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
              className="border-b border-gray-200 text-primary-800 pb-3 overflow-hidden">
              <motion.div layout className="py-2">
                {/* video title */}
                <div className="mx-2 p-2 flex items-center justify-between">
                  <h2 className="uppercase overflow-hidden flex-1 text-xs font-thin">
                    {videoName === '' ? 'Choose a video' : videoName}
                  </h2>
                  <motion.span
                    layout
                    className="material-icons shadow-lg text-secondary cursor-pointer"
                    onClick={toggleAddVideo}>
                    close
                  </motion.span>
                </div>
                {/* temp video display container */}
                <motion.video
                  layout
                  autoPlay={true}
                  loop={true}
                  playsInline={true}
                  controls={true}
                  poster={poster}
                  src={tempVideoSrc}
                  title={videoName}
                  preload="metadata"
                  id="talent__reg__vid"
                  className="object-cover object-center w-full"
                />
                {/* file input */}
                <div className="form-control relative px-2 mx-2 mt-5">
                  <input
                    type="file"
                    className="relative z-10 opacity-0"
                    onChange={(e) => handleVideoInput(e)}
                  />
                  <div className="absolute w-full top-0 left-0 flex items-center justify-between">
                    <span className="text-xs">
                      Max file size: 50MB | Format: mp4
                    </span>
                    <i className="material-icons p-1 shadow cursor-pointer">
                      add_circle_outline
                    </i>
                  </div>
                  {videoError && <FormError error={videoError} />}
                </div>
                <div className="form-control">
                  <label
                    htmlFor="caption"
                    className="label flex items-center justify-between">
                    <span>Video Caption</span>
                    <span>{captionChar}</span>
                  </label>
                  <textarea
                    id="caption"
                    rows="4"
                    onChange={(e) => {
                      const valueLength = e.target.value.length;
                      setVideoCaption(e.target.value);
                      setCationChar(500 - valueLength);
                    }}
                    maxLength="500"
                    value={videoCaption}
                    className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                    placeholder="Please tell us what is going on in this video in less than 500 characters..."></textarea>
                </div>
                {video && !videoError && (
                  <div className="text-right px-1 mx-2">
                    <button
                      className="btn bg-secondary text-primary-100"
                      type="button"
                      onClick={addVideo}>
                      Add
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {Object.keys(stats.videos)
            .sort(
              (a, b) =>
                +moment(stats.videos[b]?.updatedAt) -
                +moment(stats.videos[a]?.updatedAt)
            )
            .map((key) => (
              <Video
                video={stats.videos[key]}
                deleteVideo={deleteVideo}
                videoId={key}
                key={key}
              />
            ))}
        </motion.div>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

export default Videos;
