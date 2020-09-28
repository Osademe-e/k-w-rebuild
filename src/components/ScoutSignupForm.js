import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as yup from 'yup';

// context
import { AppContext } from '../App';

// components
import FormError from './FormError';

// hooks
import useFirestore from '../hooks/useFirestore';
import useStorage from '../hooks/useStorage';

// logo
import logo from '../assets/images/logo svg/logo.svg';

// config
import { timestamp } from '../config/fbConfig';

// utils
import countriesList from '../utils/countries.json';
import { errorDisplayHandler, fileChecker } from '../utils/_helpers';

const ScoutSignupForm = () => {
  // toogleToast function from context
  const { toogleToast, toogleModal, user, profile } = useContext(AppContext);

  // hooks
  const firestore = useFirestore();
  const storage = useStorage();

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
      const validateFile = fileChecker(file, 51000000, [
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

  // scout signup form
  const scoutForm = useFormik({
    initialValues: {
      fullName: '',
      residentialAddress: '',
      email: '',
      phoneNumber: '',
      altPhoneNumber: '',
      nationality: 'Nigeria',
      state: '',
    },
    validationSchema: yup.object({
      fullName: yup.string().required('Required'),
      residentialAddress: yup.string().required('Required'),
      email: yup.string().email('Invalid Email Address').required('Required'),
      phoneNumber: yup
        .string()
        .length(11, 'Must be exactly 11 characters')
        .required('Required'),
      altPhoneNumber: yup.string().length(11, 'Must be exactly 11 characters'),
      nationality: yup.string().required('Required'),
      state: yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      if (!photo) {
        setTempSrc(null);
        setPhotoError('No file choosen');
        setPhoto(null);
        return setSubmitting(false);
      }
      toogleModal({
        open: true,
        component: 'loader',
        message: 'Uploading photo.',
      });
      try {
        // prepare request
        const dir = 'images/scouts';

        const fileType = photo.type.split('/')[1];

        const fileName = `${
          Math.floor(Math.random() * 1e16) + Date.now()
        }.${fileType}`;

        const fileRef = storage.ref().child(`${dir}/${fileName}`);

        // upload new photo
        let uploadTask = await fileRef.put(photo);

        let downloadUrl = await uploadTask.ref.getDownloadURL();

        let uploaded = {
          photoURL: downloadUrl,
          path: uploadTask.metadata.fullPath,
        };

        await firestore
          .collection('scouts')
          .doc(user?.uid)
          .set({
            ...values,
            photo: uploaded,
            createdAt: timestamp(),
            updatedAt: timestamp(),
            approved: false,
          });

        let update = profile?.doc?.subscriptions
          ? {
              ...profile.doc.subscriptions,
              scout: true,
            }
          : { scout: true };

        await firestore.collection('users').doc(user?.uid).update({
          subscriptions: update,
        });

        toogleModal({
          open: false,
          component: '',
          message: null,
        });
      } catch (error) {
        toogleModal({
          open: false,
          component: '',
          message: null,
        });

        toogleToast(errorDisplayHandler(error));
      }
    },
  });

  return (
    <motion.form layout onSubmit={scoutForm.handleSubmit}>
      <h2 className="uppercase font-semibold pb-3 border-b border-gray-200">
        Become a scout
      </h2>

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
                Format (png, jpeg, jpg) - 50MB max
              </small>
            </label>
            <div className="relative">
              <input
                type="file"
                className="opacity-0 relative z-10 mr-1"
                onChange={handlePhoto}
              />
              <div className="absolute rounded top-0 left-0 p-2 cursor-pointer shadow flex items-center justify-between">
                <i className="material-icons mr-1">add_a_photo</i>
                <span className="text-xs">Add a photo</span>
              </div>
            </div>
            {photoName && <div className="text-xs p-2 mt-2">{photoName}</div>}
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
          {...scoutForm.getFieldProps('fullName')}
        />
        {scoutForm.touched.fullName && scoutForm.errors.fullName ? (
          <FormError error={scoutForm.errors.fullName} />
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
          {...scoutForm.getFieldProps('email')}
        />
        {scoutForm.touched.email && scoutForm.errors.email ? (
          <FormError error={scoutForm.errors.email} />
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
          {...scoutForm.getFieldProps('phoneNumber')}
        />
        {scoutForm.touched.phoneNumber && scoutForm.errors.phoneNumber ? (
          <FormError error={scoutForm.errors.phoneNumber} />
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
          {...scoutForm.getFieldProps('altPhoneNumber')}
        />
        {scoutForm.touched.altPhoneNumber && scoutForm.errors.altPhoneNumber ? (
          <FormError error={scoutForm.errors.altPhoneNumber} />
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
          {...scoutForm.getFieldProps('residentialAddress')}></textarea>

        {scoutForm.touched.residentialAddress &&
        scoutForm.errors.residentialAddress ? (
          <FormError error={scoutForm.errors.residentialAddress} />
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
            {...scoutForm.getFieldProps('nationality')}>
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
          {...scoutForm.getFieldProps('state')}
        />
        {scoutForm.touched.state && scoutForm.errors.state ? (
          <FormError error={scoutForm.errors.state} />
        ) : null}
      </motion.div>
      <motion.div layout className="flex justify-end mt-3 mx-1">
        <input
          className="btn bg-secondary text-primary-100"
          type="submit"
          value="next"
        />
      </motion.div>
    </motion.form>
  );
};

export default ScoutSignupForm;
