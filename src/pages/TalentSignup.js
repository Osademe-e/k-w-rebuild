import React, { useContext, useState } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

// context
import { AppContext } from '../App';

// hooks
import useFirestore from '../hooks/useFirestore';
import useStorage from '../hooks/useStorage';

// components
import FormError from '../components/FormError';

// helper function
import {
  errorDisplayHandler,
  pageAnim,
  getPositionAbbrev,
  fileChecker,
} from '../utils/_helpers';

// components
import HeroContainer from '../components/HeroContainer';

// logo
import logo from '../assets/images/logo svg/logo.svg';

// video poster
import poster from '../assets/images/loading.gif';

// countries
import countriesList from '../utils/countries.json';
import { timestamp } from '../config/fbConfig';

// variants
const formTwoVariants = {
  hidden: (custom) => ({
    opacity: 0,
    x: custom.hidden,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      easings: ['easeInOut'],
    },
  },
  exit: (custom) => ({
    opacity: 0,
    x: custom.exit,
    transition: {
      duration: 0.5,
      easings: ['easeInOut'],
    },
  }),
};

const TalentSignup = () => {
  // toogleToast function from context
  const { toogleToast, toogleModal, user, profile: userProfile } = useContext(
    AppContext
  );

  // hooks
  const firestore = useFirestore();
  const storage = useStorage();

  // general error
  const [error, setError] = useState('');

  // used for form transition
  const [step, setStep] = useState(1);
  const [hidden, setHidden] = useState('100vw');
  const [exit, setExit] = useState('-100vw');

  // image state
  const [photo, setPhoto] = useState(null);
  const [tempSrc, setTempSrc] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [photoError, setPhotoError] = useState(null);
  // function to handle photo
  const handlePhoto = (e) => {
    setPhotoError(null);
    setPhotoName('');
    setTempSrc(null);
    const file = e.target.files[0];
    if (file) {
      const validateFile = fileChecker(file, 2100000, [
        'image/jpeg',
        'image/png',
        'image/jpg',
      ]);
      if (validateFile.response) {
        let reader = new FileReader();
        reader.onload = (ev) => {
          setTempSrc(ev.target.result);
        };
        reader.readAsDataURL(file);
        setPhotoName(file.name);
        setPhoto(file);
      } else {
        setTempSrc(null);
        setPhotoError(validateFile.message);
        setPhoto(null);
      }
    } else {
      setTempSrc(null);
      setPhotoError('No file choosen');
      setPhoto(null);
    }
  };

  // videos handler
  const [videos, setVideos] = useState([]);
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

  // add video
  const addVideo = () => {
    if (video) {
      setVideos((prevState) => [
        ...prevState,
        { file: video, caption: videoCaption },
      ]);
      setVideo(null);
      setTempVideoSrc(null);
      setVideoError('');
      setVideoName('');
      setVideoCaption('');
      setCationChar(500);
      setShowVideoForm((prevState) => !prevState);
    } else {
      setVideoError('Please select a video');
    }
  };

  // remove a video from selected
  const removeVideoFromList = (name) => {
    setVideos((prevState) => prevState.filter((v) => v.file.name !== name));
  };

  const handleVideoInput = (e) => {
    setVideoError('');
    const file = e.target.files[0];

    if (file) {
      if (
        videos.length > 0 &&
        videos[0]?.file?.name === file.name &&
        videos[0]?.file?.size === file.size
      ) {
        setTempVideoSrc('');
        return setVideoError('Duplicate Videos');
      }

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
      setVideoName('');
    }
  };

  // player profile
  const [profile, setProfile] = useState({
    fullName: '',
    residentialAddress: '',
    email: '',
    phoneNumber: '',
    altPhoneNumber: '',
    nationality: 'Nigeria',
    state: '',
  });

  // player bio
  const [biometrics, setBiometrics] = useState({
    dateOfBirth: '',
    gender: 'Male',
    height: '',
    weight: '',
  });

  // player stats
  const [stats, setStats] = useState({
    localClub: '',
    coach: '',
    trainingSite: '',
    preferredFoot: 'Right',
    position: 'GoalKeeper',
    positionNumber: '',
    appearances: '',
    goals: '',
    assists: '',
    cleanSheets: '',
  });

  //   move to step function
  const moveToStep = (s) => {
    if (step === 2) {
      if (s === 3) {
        setExit('-100vw');
      } else {
        setExit('100vw');
      }
    }
    if (s === 2) {
      if (step === 1) {
        setHidden('100vw');
      } else {
        setHidden('-100vw');
      }
    }
    setStep(s);
  };

  //   form validation

  const profileForm = useFormik({
    initialValues: {
      ...profile,
    },
    validationSchema: yup.object({
      fullName: yup.string().required('Required'),
      residentialAddress: yup.string().required('Required'),
      email: yup.string().email('Invalid Email Address').required('Required'),
      phoneNumber: yup
        .string()
        .length(10, 'Must be exactly 11 characters')
        .required('Required'),
      altPhoneNumber: yup.string().length(10, 'Must be exactly 11 characters'),
      nationality: yup.string().required('Required'),
      state: yup.string().required('Required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      if (!photo) {
        setTempSrc(null);
        setPhotoError('No file choosen');
        setPhoto(null);
        return setSubmitting(false);
      }

      setProfile({
        ...values,
      });
      moveToStep(2);
    },
  });

  // bio form
  const biometricsForm = useFormik({
    initialValues: {
      ...biometrics,
    },
    validationSchema: yup.object({
      dateOfBirth: yup.date().required('Required'),
      gender: yup.string().required('Required'),
      height: yup.number().required('Required'),
      weight: yup.number().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      setBiometrics({
        ...values,
      });
      moveToStep(3);
    },
  });

  // stats form
  const statsForm = useFormik({
    initialValues: {
      ...stats,
    },
    validationSchema: yup.object({
      localClub: yup.string().required('Required'),
      coach: yup.string().required('Required'),
      trainingSite: yup.string().required('Required'),
      preferredFoot: yup.string().required('Required'),
      position: yup.string().required('Required'),
      positionNumber: yup
        .number()
        .integer()
        .min(1, 'Cannot be less than 1')
        .required('Required'),
      appearances: yup
        .number()
        .integer()
        .min(0, 'Cannot be less than 1')
        .required('Required'),
      goals: yup
        .number()
        .integer()
        .min(0, 'Cannot be less than 1')
        .required('Required'),
      assists: yup
        .number()
        .integer()
        .min(0, 'Cannot be less than 1')
        .required('Required'),
      cleanSheets: yup
        .number()
        .integer()
        .min(0, 'Cannot be less than 1')
        .required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      // check if alteas one video
      if (videos.length === 0) {
        setError('Your must upload atleast one video.');
        return setSubmitting(false);
      }

      toogleModal({
        open: true,
        component: 'loader',
        message: 'Uploading files...',
      });

      // upload photos and videos
      let files = [photo];
      videos.forEach((v) => files.push(v.file));
      // prepare request
      const request = files.map((file, i) => {
        const dir = i === 0 ? 'images/talents' : 'videos/talents';

        const fileType = file.type.split('/')[1];

        const fileName = `${
          Math.floor(Math.random() * 1e16) + Date.now()
        }.${fileType}`;

        const fileRef = storage.ref().child(`${dir}/${fileName}`);
        return fileRef.put(file);
      });

      try {
        let uploadTasks = await Promise.all(request);

        let downloadURLRequests = uploadTasks.map((uploadTask) =>
          uploadTask.ref.getDownloadURL()
        );

        let downloadUrls = await Promise.all(downloadURLRequests);

        let uploaded = downloadUrls.map((url, i) => {
          if (i === 0) {
            return {
              photoURL: url,
              path: uploadTasks[i].metadata.fullPath,
            };
          } else {
            return {
              [uploadTasks[i].metadata.name.split('.')[0]]: {
                videoURL: url,
                path: uploadTasks[i].metadata.fullPath,
                caption: videos[i - 1].caption,
                updatedAt: uploadTasks[i].metadata.timeCreated,
              },
            };
          }
        });

        toogleModal({
          message: 'Creating talent profile...',
        });

        let vid = {};
        const vidArray = uploaded.slice(1);
        vidArray.forEach((v) => {
          vid = {
            ...vid,
            ...v,
          };
        });

        // structure firestore uploads
        let talentData = {
          approved: false,
          featured: false,
          createdAt: timestamp(),
          profile: {
            ...profile,
            updatedAt: timestamp(),
            photo: uploaded[0],
          },
          biometrics: {
            ...biometrics,
            updatedAt: timestamp(),
          },
          stats: {
            ...values,
            updatedAt: timestamp(),
            videos: vid,
          },
        };

        // store data to firebase firestore
        await firestore
          .collection('talents')
          .doc(user.uid)
          .set({ ...talentData });

        toogleModal({
          message: 'Updating user profile...',
        });
        // update users collection
        let subscriptions = userProfile.doc.subscriptions
          ? {
              ...userProfile.doc.subscriptions,
              talent: true,
            }
          : {
              talent: true,
            };
        await firestore
          .collection('users')
          .doc(user.uid)
          .update({ subscriptions });

        // all done

        toogleModal({
          open: false,
          components: '',
          message: null,
        });
      } catch (error) {
        toogleModal({
          open: false,
          components: '',
          message: null,
        });
        setSubmitting(false);
        toogleToast(errorDisplayHandler(error));
      }
    },
  });

  return (
    <motion.div
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="talentSignup">
      <HeroContainer>
        <h2 className="text-primary-100 font-semibold lg:container mx-auto text-xl lg:text-5xl px-2 lg:px-0 my-6">
          Talent Signup
        </h2>
      </HeroContainer>
      {!userProfile.fetching && userProfile?.doc?.subscriptions?.talent ? (
        <motion.div exit="undefined">
          <Redirect to={`/talents/${user.uid}`} />
        </motion.div>
      ) : (
        <div className="lg:container mx-auto px-2 lg:px-0 my-5">
          <div className="talentSignup__steperWrapper flex justify-around items-center w-full lg:w-1/2 mx-0 lg:mx-auto">
            {/* steppers */}
            <div className={`talentSignup__step`}>
              <div
                className={`w-16 h-16 font-semibold rounded-full border border-gray-40 flex items-center  justify-center ${
                  step === 2 || step === 3 ? 'bg-primary-500' : ''
                }`}>
                1
              </div>
            </div>
            <div
              className={`talentSignup__connector w-full h-5 flex-1 border border-gray-40 border-l-0 border-r-0 ${
                step === 2 || step === 3 ? 'bg-primary-500' : ''
              }`}></div>
            <div className={`talentSignup__step`}>
              <div
                className={`w-16 h-16 font-semibold rounded-full border border-gray-40 flex items-center  justify-center ${
                  step === 3 ? 'bg-primary-500' : ''
                }`}>
                2
              </div>
            </div>
            <div
              className={`talentSignup__connector w-full flex-1 h-5 border border-gray-40 border-l-0 border-r-0 ${
                step === 3 ? 'bg-primary-500' : ''
              }`}></div>
            <div className={`talentSignup__step`}>
              <div
                className={`w-16 h-16 font-semibold rounded-full border border-gray-40 flex items-center  justify-center`}>
                3
              </div>
            </div>
          </div>

          {/* forms */}
          <div
            className={`flex justify-around items-center w-full lg:w-1/2 mx-0 lg:mx-auto mt-5 overflow-hidden text-primary-900 px-2 py-2`}>
            <AnimatePresence>
              {step === 1 && (
                <motion.div
                  className={`step-1 shadow rounded p-3 w-full bg-white`}
                  initial={{
                    x: '-100vw',
                  }}
                  animate={{
                    x: 0,
                    transition: {
                      duration: 0.5,
                      easings: ['easeInOut'],
                    },
                  }}
                  exit={{
                    x: '-100vw',
                    transition: {
                      duration: 0.5,
                      easings: ['easeInOut'],
                    },
                  }}>
                  <AnimateSharedLayout>
                    <motion.form layout onSubmit={profileForm.handleSubmit}>
                      <h2 className="uppercase font-semibold py-3 border-b border-gray-200">
                        Profile
                      </h2>
                      <motion.div layout className="py-3">
                        {/* photo */}
                        <motion.div layout className="form-control">
                          <div className="flex items-center justify-between overflow-hidden">
                            <img
                              src={tempSrc ? tempSrc : logo}
                              alt="profile"
                              style={{
                                width: '70px',
                                height: '70px',
                                objectFit: tempSrc ? 'cover' : 'contain',
                                objectPosition: 'center',
                              }}
                            />
                            <div className="flex-1">
                              <label className="label">
                                Profile Image.{' '}
                                <small className="text-xs">
                                  Format (png) - 2MB max
                                </small>
                              </label>
                              <div className="relative">
                                <input
                                  type="file"
                                  className="opacity-0 relative z-10 mr-1"
                                  onChange={handlePhoto}
                                />
                                <div className="absolute rounded top-0 left-0 p-2 cursor-pointer shadow flex items-center justify-between">
                                  <i className="material-icons mr-1">
                                    add_a_photo
                                  </i>
                                  <span className="text-xs">Add a photo</span>
                                </div>
                              </div>
                              {photoName && (
                                <div className="text-xs p-2 mt-2">
                                  {photoName}
                                </div>
                              )}
                              {photoError && <FormError error={photoError} />}
                            </div>
                          </div>
                        </motion.div>

                        {/* full name */}
                        <motion.div layout className="form-control">
                          <label htmlFor="fullName" className="label">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">person</i>
                              Full name
                            </div>
                          </label>
                          <input
                            id="fullName"
                            name={`fullName`}
                            type="text"
                            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                            placeholder="John Doe"
                            {...profileForm.getFieldProps('fullName')}
                          />
                          {profileForm.touched.fullName &&
                          profileForm.errors.fullName ? (
                            <FormError error={profileForm.errors.fullName} />
                          ) : null}
                        </motion.div>

                        {/* Email */}
                        <motion.div layout className="form-control">
                          <label htmlFor="email" className="label">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">email</i>
                              Email
                            </div>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                            placeholder="example@gmail.com"
                            {...profileForm.getFieldProps('email')}
                          />
                          {profileForm.touched.email &&
                          profileForm.errors.email ? (
                            <FormError error={profileForm.errors.email} />
                          ) : null}
                        </motion.div>

                        {/* phone number */}
                        <motion.div layout className="form-control">
                          <label htmlFor="phoneNumber" className="label">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">phone</i>
                              Phone Number
                            </div>
                          </label>
                          <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="number"
                            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                            placeholder="08011111111"
                            {...profileForm.getFieldProps('phoneNumber')}
                          />
                          {profileForm.touched.phoneNumber &&
                          profileForm.errors.phoneNumber ? (
                            <FormError error={profileForm.errors.phoneNumber} />
                          ) : null}
                        </motion.div>

                        {/* alt phone number */}
                        <motion.div layout className="form-control">
                          <label htmlFor="altPhoneNumber" className="label">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">phone</i>
                              Alternate Phone Number
                            </div>
                          </label>
                          <input
                            id="altPhoneNumber"
                            name="altPhoneNumber"
                            type="number"
                            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                            placeholder="08011111111"
                            {...profileForm.getFieldProps('altPhoneNumber')}
                          />
                          {profileForm.touched.altPhoneNumber &&
                          profileForm.errors.altPhoneNumber ? (
                            <FormError
                              error={profileForm.errors.altPhoneNumber}
                            />
                          ) : null}
                        </motion.div>

                        {/* residential address */}
                        <motion.div layout className="form-control">
                          <label htmlFor="residentialAddress" className="label">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">my_location</i>
                              Residential Address
                            </div>
                          </label>
                          <textarea
                            name="residentialAddress"
                            id="residentialAddress"
                            rows="5"
                            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                            placeholder="# street, city"
                            {...profileForm.getFieldProps(
                              'residentialAddress'
                            )}></textarea>

                          {profileForm.touched.residentialAddress &&
                          profileForm.errors.residentialAddress ? (
                            <FormError
                              error={profileForm.errors.residentialAddress}
                            />
                          ) : null}
                        </motion.div>

                        {/* nationality */}
                        <motion.div layout className="form-control">
                          <label
                            htmlFor="nationality"
                            className="text-sm font-semibold mb-2 text-primary-800">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">language</i>
                              Nationality
                            </div>
                          </label>
                          <div className="relative">
                            <select
                              className="input-field"
                              id="nationality"
                              name="nationality"
                              {...profileForm.getFieldProps('nationality')}>
                              {countriesList.map((country, i) => (
                                <option key={i}>{country}</option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </motion.div>

                        {/* state */}
                        <motion.div layout className="form-control">
                          <label htmlFor="state" className="label">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">map</i>
                              State/Province
                            </div>
                          </label>
                          <input
                            id="state"
                            name={`state`}
                            type="text"
                            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                            placeholder="State or Province"
                            {...profileForm.getFieldProps('state')}
                          />
                          {profileForm.touched.state &&
                          profileForm.errors.state ? (
                            <FormError error={profileForm.errors.state} />
                          ) : null}
                        </motion.div>
                        <motion.div
                          layout
                          className="flex justify-end mt-3 mx-1">
                          <input
                            className="btn bg-secondary text-primary-100"
                            type="submit"
                            value="next"
                          />
                        </motion.div>
                      </motion.div>
                    </motion.form>
                  </AnimateSharedLayout>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence
              custom={{
                hidden,
                exit,
              }}>
              {step === 2 && (
                <motion.div
                  className={`step-2 shadow rounded p-3 w-full bg-white`}
                  custom={{
                    hidden,
                    exit,
                  }}
                  variants={formTwoVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit">
                  <AnimateSharedLayout>
                    <motion.form layout onSubmit={biometricsForm.handleSubmit}>
                      <motion.h2
                        layout
                        className="uppercase font-semibold py-3 border-b border-gray-200">
                        biometrics
                      </motion.h2>
                      <motion.div layout className="py-3">
                        {/* date of birth */}
                        <motion.div layout className="form-control">
                          <label htmlFor="dateOfBirth" className="label">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">
                                calendar_today
                              </i>
                              Date of Birth
                            </div>
                          </label>
                          <input
                            id="dateOfBirth"
                            name={`dateOfBirth`}
                            type="date"
                            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                            {...biometricsForm.getFieldProps('dateOfBirth')}
                          />
                          {biometricsForm.touched.dateOfBirth &&
                          biometricsForm.errors.dateOfBirth ? (
                            <FormError
                              error={biometricsForm.errors.dateOfBirth}
                            />
                          ) : null}
                        </motion.div>

                        {/* gender */}
                        <motion.div layout className="form-control">
                          <label
                            htmlFor="gender"
                            className="text-sm font-semibold mb-2 text-primary-800">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">face</i>
                              Gender
                            </div>
                          </label>
                          <div className="relative">
                            <select
                              className="input-field"
                              id="gender"
                              name="gender"
                              {...biometricsForm.getFieldProps('gender')}>
                              <option>Male</option>
                              <option>Female</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </motion.div>

                        {/* height */}
                        <motion.div layout className="form-control">
                          <label htmlFor="height" className="label">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">height</i>
                              Height <small>(cm)</small>
                            </div>
                          </label>
                          <input
                            id="height"
                            name="height"
                            type="number"
                            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                            placeholder="100"
                            {...biometricsForm.getFieldProps('height')}
                          />
                          {biometricsForm.touched.height &&
                          biometricsForm.errors.height ? (
                            <FormError error={biometricsForm.errors.height} />
                          ) : null}
                        </motion.div>

                        {/* weight */}
                        <motion.div layout className="form-control">
                          <label htmlFor="weight" className="label">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">
                                fitness_center
                              </i>
                              Weight <small>(kg)</small>
                            </div>
                          </label>
                          <input
                            id="weight"
                            name="weight"
                            type="number"
                            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                            placeholder="60"
                            {...biometricsForm.getFieldProps('weight')}
                          />
                          {biometricsForm.touched.weight &&
                          biometricsForm.errors.weight ? (
                            <FormError error={biometricsForm.errors.weight} />
                          ) : null}
                        </motion.div>

                        <motion.div
                          layout
                          className="mt-3 mx-1 flex justify-between items-center">
                          <button
                            type="button"
                            className="btn"
                            onClick={() => moveToStep(1)}>
                            Back
                          </button>
                          <input
                            type="submit"
                            className="btn bg-secondary text-primary-100"
                            value="next"
                          />
                        </motion.div>
                      </motion.div>
                    </motion.form>
                  </AnimateSharedLayout>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {step === 3 && (
                <motion.div
                  className={`step-3 shadow rounded p-3 w-full bg-white`}
                  initial={{
                    x: '100vw',
                  }}
                  animate={{
                    x: 0,
                    transition: {
                      duration: 0.5,
                      easings: ['easeInOut'],
                    },
                  }}
                  exit={{
                    x: '100vw',
                    transition: {
                      duration: 0.5,
                      easings: ['easeInOut'],
                    },
                  }}>
                  <AnimateSharedLayout>
                    <motion.form layout onSubmit={statsForm.handleSubmit}>
                      <motion.h2
                        layout
                        className="uppercase font-semibold py-3 border-b border-gray-200">
                        Stats
                      </motion.h2>
                      <motion.div layout className="py-3">
                        {/* for videos */}
                        <motion.div
                          layout
                          className="border-b border-gray-200 text-primary-800 pb-3">
                          <motion.h2
                            layout
                            className="uppercase text-sm font-semibold mx-2 px-1 py-2 mb-3">
                            Videos
                          </motion.h2>
                          {showVideoForm && (
                            <motion.div layout className="py-2 shadow">
                              {/* video title */}
                              <div className="mx-2 p-2 flex items-center justify-between">
                                <h2 className="uppercase overflow-hidden flex-1 text-xs font-thin">
                                  {videoName === ''
                                    ? 'Choose a video'
                                    : videoName}
                                </h2>
                                <span
                                  className="p-1 border border-primary-700 cursor-pointer rounded"
                                  onClick={toggleAddVideo}>
                                  Close
                                </span>
                              </div>
                              {/* temp video display container */}
                              <motion.div></motion.div>
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
                              <div className="text-right px-1 mx-2">
                                <button
                                  className="btn bg-secondary text-primary-100"
                                  type="button"
                                  onClick={addVideo}>
                                  Add
                                </button>
                              </div>
                            </motion.div>
                          )}

                          {/* button to toggle video upload form */}
                          {videos.length <= 1 && !showVideoForm && (
                            <motion.div
                              layout
                              className="flex items-center justify-between px-2 mx-2 py-2">
                              <span className="font-semibold text-xs">
                                Add a video
                              </span>
                              <i
                                className="material-icons p-1 shadow cursor-pointer"
                                onClick={toggleAddVideo}>
                                add_circle_outline
                              </i>
                            </motion.div>
                          )}
                          {videos.length > 0 && (
                            <motion.div layout>
                              {videos.map(({ file, caption }, i) => (
                                <div
                                  key={i}
                                  className="flex justify-between items-center mt-3 bg-gray-800 py-2 px-2 rounded">
                                  <i className="material-icons text-primary-500">
                                    play_circle_outline
                                  </i>
                                  <span className="flex-1 overflow-hidden mx-1 text-primary-100">
                                    {file.name}
                                  </span>
                                  <i
                                    className="material-icons text-red-600 cursor-pointer"
                                    onClick={() =>
                                      removeVideoFromList(file.name)
                                    }>
                                    delete_outline
                                  </i>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </motion.div>

                        {/* local club */}
                        <motion.div layout className="form-control">
                          <label htmlFor="localClub" className="label">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">
                                sports_soccer
                              </i>
                              Local Club
                            </div>
                          </label>
                          <input
                            id="localClub"
                            name={`localClub`}
                            type="text"
                            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                            placeholder="Young Star FC"
                            {...statsForm.getFieldProps('localClub')}
                          />
                          {statsForm.touched.localClub &&
                          statsForm.errors.localClub ? (
                            <FormError error={statsForm.errors.localClub} />
                          ) : null}
                        </motion.div>

                        {/* coach */}
                        <motion.div layout className="form-control">
                          <label htmlFor="coach" className="label">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">person</i>
                              Coach/Trainer
                            </div>
                          </label>
                          <input
                            id="coach"
                            name={`coach`}
                            type="text"
                            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                            placeholder="John Doe"
                            {...statsForm.getFieldProps('coach')}
                          />
                          {statsForm.touched.coach && statsForm.errors.coach ? (
                            <FormError error={statsForm.errors.coach} />
                          ) : null}
                        </motion.div>

                        {/* training site */}
                        <motion.div layout className="form-control">
                          <label htmlFor="trainingSite" className="label">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">my_location</i>
                              Training Site
                            </div>
                          </label>
                          <input
                            id="trainingSite"
                            name={`trainingSite`}
                            type="text"
                            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                            placeholder="Hybrid Stadium"
                            {...statsForm.getFieldProps('trainingSite')}
                          />
                          {statsForm.touched.trainingSite &&
                          statsForm.errors.trainingSite ? (
                            <FormError error={statsForm.errors.trainingSite} />
                          ) : null}
                        </motion.div>

                        {/* preferred foot */}
                        <motion.div layout className="form-control">
                          <label
                            htmlFor="preferredFoot"
                            className="text-sm font-semibold mb-2 text-primary-800">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">star_rate</i>
                              Preferred Foot
                            </div>
                          </label>
                          <div className="relative">
                            <select
                              className="input-field"
                              id="preferredFoot"
                              name="preferredFoot"
                              {...statsForm.getFieldProps('preferredFoot')}>
                              <option>Right</option>
                              <option>Left</option>
                              <option>Both</option>
                              <option>Gloves</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </motion.div>

                        {/* position */}
                        <motion.div layout className="form-control">
                          <label
                            htmlFor="position"
                            className="text-sm font-semibold mb-2 text-primary-800">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">
                                location_searching
                              </i>
                              Position
                            </div>
                          </label>
                          <div className="relative">
                            <select
                              className="input-field"
                              id="position"
                              name="position"
                              {...statsForm.getFieldProps('position')}>
                              {[
                                'Goalkeeper',
                                'Centre Back',
                                'Sweeper',
                                'Left Back',
                                'Right Back',
                                'Left Wing Back',
                                'Right Wing Back',
                                'Centre Midfield',
                                'Defensive Midfield',
                                'Attacking Midfield',
                                'Left Midfield',
                                'Right Midfield',
                                'Centre Forward',
                                'Second Striker',
                                'Left Winger',
                                'Right Winger',
                              ].map((pos, i) => (
                                <option key={i} value={pos}>
                                  {getPositionAbbrev(pos)}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </motion.div>

                        {/* positionNumber */}
                        <motion.div layout className="form-control">
                          <label htmlFor="positionNumber" className="label">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">looks_one</i>
                              Position Number
                            </div>
                          </label>
                          <input
                            id="positionNumber"
                            name="positionNumber"
                            type="number"
                            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                            placeholder="100"
                            {...statsForm.getFieldProps('positionNumber')}
                          />
                          {statsForm.touched.positionNumber &&
                          statsForm.errors.positionNumber ? (
                            <FormError
                              error={statsForm.errors.positionNumber}
                            />
                          ) : null}
                        </motion.div>

                        {/* appearances */}
                        <motion.div layout className="form-control">
                          <label htmlFor="appearances" className="label">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">camera</i>
                              Appearances
                            </div>
                          </label>
                          <input
                            id="appearances"
                            name="appearances"
                            type="number"
                            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                            placeholder="100"
                            {...statsForm.getFieldProps('appearances')}
                          />
                          {statsForm.touched.appearances &&
                          statsForm.errors.appearances ? (
                            <FormError error={statsForm.errors.appearances} />
                          ) : null}
                        </motion.div>

                        {/* goals */}
                        <motion.div layout className="form-control">
                          <label htmlFor="goals" className="label">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">
                                sports_soccer
                              </i>
                              Goals
                            </div>
                          </label>
                          <input
                            id="goals"
                            name="goals"
                            type="number"
                            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                            placeholder="100"
                            {...statsForm.getFieldProps('goals')}
                          />
                          {statsForm.touched.goals && statsForm.errors.goals ? (
                            <FormError error={statsForm.errors.goals} />
                          ) : null}
                        </motion.div>

                        {/* assists */}
                        <motion.div layout className="form-control">
                          <label htmlFor="assists" className="label">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">thumb_up</i>
                              Assists
                            </div>
                          </label>
                          <input
                            id="assists"
                            name="assists"
                            type="number"
                            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                            placeholder="100"
                            {...statsForm.getFieldProps('assists')}
                          />
                          {statsForm.touched.assists &&
                          statsForm.errors.assists ? (
                            <FormError error={statsForm.errors.assists} />
                          ) : null}
                        </motion.div>

                        {/* cleanSheets */}
                        <motion.div layout className="form-control">
                          <label htmlFor="cleanSheets" className="label">
                            <div className="flex items-center">
                              <i className="material-icons mr-1">sports_mma</i>
                              Clean Sheets
                            </div>
                          </label>
                          <input
                            id="cleanSheets"
                            name="cleanSheets"
                            type="number"
                            className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
                            placeholder="100"
                            {...statsForm.getFieldProps('cleanSheets')}
                          />
                          {statsForm.touched.cleanSheets &&
                          statsForm.errors.cleanSheets ? (
                            <FormError error={statsForm.errors.cleanSheets} />
                          ) : null}
                        </motion.div>

                        <motion.div
                          layout
                          className="mt-3 mx-1 flex justify-between items-center">
                          <button
                            type="button"
                            className="btn"
                            onClick={() => moveToStep(2)}>
                            Back
                          </button>
                          <input
                            type="submit"
                            disabled={statsForm.isSubmitting}
                            className="btn bg-secondary text-primary-100"
                            value="submit"
                          />
                        </motion.div>
                        {error && <FormError error={error} />}
                      </motion.div>
                    </motion.form>
                  </AnimateSharedLayout>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TalentSignup;
