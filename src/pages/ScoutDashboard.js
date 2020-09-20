import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

// context
import { AppContext } from '../App';

// components
import Loader from '../components/Loader';
import PageError from '../components/PageError';
import HeroContainer from '../components/HeroContainer';
import ScoutProfile from '../components/ScoutProfile';

// hooks
import useFirestoreDoc from '../hooks/useFirestoreDoc';
import useFirestore from '../hooks/useFirestore';
import useStorage from '../hooks/useStorage';

import { timestamp } from '../config/fbConfig';

// helper
import { pageAnim, errorDisplayHandler, fileChecker } from '../utils/_helpers';

const ScoutDashboard = () => {
  // context
  const { user, toogleModal, toogleToast, profile } = useContext(AppContext);

  // hooks
  const firestore = useFirestore();
  const storage = useStorage();
  const history = useHistory();

  // get talent id from url
  const { id } = useParams();

  // fetch talent doc
  const { doc, fetching, error } = useFirestoreDoc('scouts', id);

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
      const oldImgPath = doc.photo;
      // upload photos and videos
      try {
        // prepare request
        const dir = 'images/scouts';

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
          ...doc,
          updatedAt: timestamp(),
          photo: uploaded,
        };

        // update firestore
        await firestore.collection('scouts').doc(id).update(update);

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

  // approve talent
  const approveScout = async () => {
    toogleModal({
      open: true,
      component: 'loader',
      message: `Approving ${doc?.fullName}'s scout profile...`,
    });

    try {
      await firestore.collection('scouts').doc(id).update({ approved: true });

      toogleModal({
        open: false,
        component: '',
        message: null,
      });
      toogleToast(`${doc?.fullName}'s scout profile has been approved.`);
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
            {doc?.fullName}
          </h1>
        </div>
      </HeroContainer>
      <div className="lg:container mx-auto px-2 lg:px-0">
        {doc &&
          (doc.approved ||
            (profile && profile?.doc?.role === 'super admin')) && (
            <section className="w-full lg:w-1/2 mt-4 mx-auto">
              {!doc.approved &&
                profile &&
                profile?.doc?.role === 'super admin' && (
                  <div className="bg-white shadow rounded overflow-hidden mb-4 flex items-center justify-between text-xs p-2 font-semibold">
                    <span
                      className="cursor-pointer flex items-center"
                      onClick={() => history.goBack()}>
                      <span className="material-icons mr-2">arrow_back</span>
                      <span>Back</span>
                    </span>
                    <span
                      className="cursor-pointer p-2 rounded bg-secondary text-primary-100 uppercase"
                      onClick={approveScout}>
                      Approve
                    </span>
                  </div>
                )}
              <div
                className="bg-white shadow rounded overflow-hidden relative mb-4"
                style={
                  {
                    // top: '-30px',
                  }
                }>
                <h2 className="font-semibold px-2 py-3 border-b border-gray-200 ">
                  {doc?.fullName}
                </h2>
                <img
                  src={doc?.photo?.photoURL}
                  alt="Talent pix"
                  className="w-full h-64 object-contain object-top"
                />

                {user?.uid === doc?.id && (
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
              <ScoutProfile profile={doc} />
            </section>
          )}
        {!doc && !fetching && <PageError message={`Not Found`} />}
        {doc && !doc.approved && profile?.doc?.role !== 'super admin' && (
          <div className="font-semibold text-center py-2 mt-4">
            Scout profile not avaliable at the moment
          </div>
        )}
        {fetching && !doc && <Loader />}
        {error && <PageError message={errorDisplayHandler(error)} />}
      </div>
    </motion.div>
  );
};

export default ScoutDashboard;
