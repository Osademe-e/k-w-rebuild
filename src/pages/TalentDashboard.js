import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import moment from 'moment';

// context
import { AppContext } from '../App';

// components
import Loader from '../components/Loader';
import PageError from '../components/PageError';
import HeroContainer from '../components/HeroContainer';
import Profile from '../components/Profile';
import Videos from '../components/Videos';
import Stats from '../components/Stats';
import Biometrics from '../components/Biometrics';
import Review from '../components/Review';
import ScoutComments from '../components/ScoutComments';

// hooks
import useFirestoreDoc from '../hooks/useFirestoreDoc';
import useFirestore from '../hooks/useFirestore';
import useStorage from '../hooks/useStorage';

import { timestamp } from '../config/fbConfig';

// helper
import { pageAnim, errorDisplayHandler, fileChecker } from '../utils/_helpers';

const TalentDashboard = () => {
  // context
  const { user, toogleModal, toogleToast } = useContext(AppContext);

  // hooks
  const firestore = useFirestore();
  const storage = useStorage();

  // get talent id from url
  const { id } = useParams();

  // fetch talent doc
  const { doc, fetching, error } = useFirestoreDoc('talents', id);

  const handleProfilePixChange = async (e) => {
    const file = e.target.files[0];
    toogleModal({
      open: true,
      component: 'loader',
      message: 'Uploading image...',
    });

    // check if a file was selected
    if (!file) {
      toogleModal({
        open: false,
        component: '',
        message: null,
      });
      return toogleToast('No image selected');
    }

    // validate file
    const validateFile = fileChecker(file, 2100000, [
      'image/jpeg',
      'image/png',
      'image/jpg',
    ]);

    if (validateFile.response) {
      const oldImgPath = doc.profile.photo;
      // upload photos and videos
      try {
        // prepare request
        const dir = 'images/talents';

        const fileType = file.type.split('/')[1];

        const fileName = `${
          Math.floor(Math.random() * 1e16) + Date.now()
        }.${fileType}`;

        const fileRef = storage.ref().child(`${dir}/${fileName}`);

        // upload new photo
        let uploadTask = await fileRef.put(file);

        let downloadUrl = await uploadTask.ref.getDownloadURL();

        let uploaded = {
          photoURL: downloadUrl,
          path: uploadTask.metadata.fullPath,
        };

        let update = {
          ...doc.profile,
          updatedAt: timestamp(),
          photo: uploaded,
        };

        // update firestore
        await firestore
          .collection('talents')
          .doc(id)
          .update({ profile: update });

        // delete old image
        await storage.ref().child(oldImgPath.path).delete();
        toogleModal({
          open: false,
          component: '',
          message: null,
        });
        return toogleToast('Profile Updated.');
      } catch (error) {
        if (error.code === 'storage/object-not-found') {
          // send to admin
          toogleModal({
            open: false,
            component: '',
            message: null,
          });
          return toogleToast('Profile Updated.');
        } else {
          toogleModal({
            open: false,
            component: '',
            message: null,
          });
          return toogleToast(errorDisplayHandler(error));
        }
      }
    } else {
      toogleModal({
        open: false,
        component: '',
        message: null,
      });
      return toogleToast(validateFile.message);
    }
  };

  return (
    <motion.div
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-primary-900">
      <HeroContainer>
        <div className="text-right px-8 my-6">
          <h1
            className="font-semibold text-5xl text-transparent"
            style={{
              WebkitTextStroke: '1px gold',
            }}>
            {doc?.stats?.positionNumber}
          </h1>
        </div>
      </HeroContainer>
      <div className="lg:container mx-auto px-2 lg:px-0">
        {doc && (
          <div className="lg:flex">
            <section className="w-full lg:w-1/4">
              <div
                className="bg-white shadow rounded overflow-hidden relative"
                style={{
                  top: '-30px',
                }}>
                <h2 className="font-semibold px-2 py-3 border-b border-gray-200 ">
                  {doc?.profile?.fullName}
                </h2>
                <img
                  src={doc?.profile?.photo?.photoURL}
                  alt="Talent pix"
                  className="w-full h-64 object-cover object-top"
                />

                {user.uid === doc?.id && (
                  <div className="p-2 flex justify-between items-center">
                    <span className="text-xs font-semibold">
                      Created:{' '}
                      {moment(
                        doc.createdAt?.seconds
                          ? doc.createdAt?.toDate()
                          : doc.createdAt
                      ).format('MMM YY')}
                    </span>
                    <div className="relative flex">
                      <input
                        type="file"
                        className="w-full opacity-0 z-10"
                        onChange={handleProfilePixChange}
                      />
                      <span className="material-icons shadow-lg absolute right-0 top-0 text-secondary">
                        camera
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <Profile profile={doc.profile} />
              <Biometrics biometrics={doc.biometrics} />
            </section>
            <section className="flex-1 mt-5 lg:mt-4 mx-0 lg:mx-5">
              <Review review={doc?.adminReview} />
              <ScoutComments comments={doc?.scoutComments} />
              <Stats stats={doc.stats} />
            </section>
            <section className="w-full lg:w-1/3 mt-4">
              <Videos stats={doc.stats} />
            </section>
          </div>
        )}
        {!doc && !fetching && <PageError message={`Not Found`} />}
        {fetching && !doc && <Loader />}
        {error && <PageError message={errorDisplayHandler(error)} />}
      </div>
    </motion.div>
  );
};

export default TalentDashboard;
