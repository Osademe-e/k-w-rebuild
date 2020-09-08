import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import moment from 'moment';

// context
import { AppContext } from '../App';

// hooks
import useFirestore from '../hooks/useFirestore';

// components
import FormError from './FormError';

// country json
import countriesList from '../utils/countries.json';

// helpers
import { errorDisplayHandler } from '../utils/_helpers';

// config
import { timestamp } from '../config/fbConfig';

const Profile = ({ profile }) => {
  // context
  const { user, toogleModal, toogleToast } = useContext(AppContext);

  // hooks
  const firestore = useFirestore();

  // edit state
  const [editting, setEditting] = useState(false);

  // talent id
  const { id } = useParams();

  const profileForm = useFormik({
    initialValues: {
      fullName: profile.fullName,
      residentialAddress: profile.residentialAddress,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      altPhoneNumber: profile.altPhoneNumber,
      nationality: profile.nationality,
      state: profile.state,
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
    onSubmit: async (values, { setSubmitting }) => {
      let changed = false;
      toogleModal({
        open: true,
        component: 'loader',
        message: 'Updating Profile...',
      });

      // check if any input field was changed
      Object.keys(values).forEach((key) => {
        if (profile[key] !== values[key]) {
          changed = true;
        }
      });

      if (changed) {
        try {
          const update = {
            ...profile,
            ...values,
            updatedAt: timestamp(),
          };

          // update firestore
          await firestore
            .collection('talents')
            .doc(id)
            .update({ profile: update });
          setEditting((prevState) => !prevState);
          toogleModal({
            open: false,
            component: '',
            message: null,
          });
          toogleToast('Profile updated.');
        } catch (error) {
          toogleModal({
            open: false,
            component: '',
            message: null,
          });
          toogleToast(errorDisplayHandler(error));
        }
      } else {
        setEditting((prevState) => !prevState);
        toogleModal({
          open: false,
          component: '',
          message: null,
        });
        toogleToast('Profile updated.');
      }
    },
  });

  return (
    <div className="shadow rounded bg-white px-2 py-3">
      <div className="flex justify-between items-center">
        <div className="pb-2 border-b border-gray-200">
          <h1 className="uppercase font-semibold text-sm">Profile</h1>
          {user.uid === id && (
            <p className="text-xs opacity-75">
              Updated:{' '}
              {moment(
                profile.updatedAt?.seconds
                  ? profile.updatedAt?.toDate()
                  : profile.updatedAt
              ).format('DD MMM YY')}
            </p>
          )}
        </div>
        {!editting && user.uid === id && (
          <span
            className="material-icons shadow-lg text-secondary cursor-pointer"
            onClick={() => setEditting((prevState) => !prevState)}>
            edit
          </span>
        )}
      </div>

      {/* profile info */}
      <AnimateSharedLayout>
        <AnimatePresence>
          <motion.div layout className={` py-2 w-full`}>
            <motion.form layout onSubmit={profileForm.handleSubmit}>
              <motion.div layout className={`py-3`}>
                {/* full name */}
                <motion.div layout className={`form-control`}>
                  <label
                    htmlFor="fullName"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div className="flex items-center">
                      <i className="material-icons mr-1">person</i>
                      Full name
                    </div>
                  </label>
                  <input
                    id="fullName"
                    name={`fullName`}
                    type="text"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="John Doe"
                    {...profileForm.getFieldProps('fullName')}
                  />
                  {profileForm.touched.fullName &&
                  profileForm.errors.fullName ? (
                    <FormError error={profileForm.errors.fullName} />
                  ) : null}
                </motion.div>

                {/* Email */}
                <motion.div layout className={`form-control`}>
                  <label
                    htmlFor="email"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div className="flex items-center">
                      <i className="material-icons mr-1">email</i>
                      Email
                    </div>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    disabled={true}
                    className={`
                      'appearance-none w-full py-2 px-2 outline-none text-xs'
                       `}
                    placeholder="example@gmail.com"
                    {...profileForm.getFieldProps('email')}
                  />
                  {profileForm.touched.email && profileForm.errors.email ? (
                    <FormError error={profileForm.errors.email} />
                  ) : null}
                </motion.div>

                {/* phone number */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="phoneNumber"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div className="flex items-center">
                      <i className="material-icons mr-1">phone</i>
                      Phone Number
                    </div>
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
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
                  <label
                    htmlFor="altPhoneNumber"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div className="flex items-center">
                      <i className="material-icons mr-1">phone</i>
                      Alternate Phone Number
                    </div>
                  </label>
                  <input
                    id="altPhoneNumber"
                    name="altPhoneNumber"
                    disabled={!editting}
                    type="number"
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="08011111111"
                    {...profileForm.getFieldProps('altPhoneNumber')}
                  />
                  {profileForm.touched.altPhoneNumber &&
                  profileForm.errors.altPhoneNumber ? (
                    <FormError error={profileForm.errors.altPhoneNumber} />
                  ) : null}
                </motion.div>

                {/* residential address */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="residentialAddress"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div className="flex items-center">
                      <i className="material-icons mr-1">my_location</i>
                      Residential Address
                    </div>
                  </label>
                  <textarea
                    name="residentialAddress"
                    id="residentialAddress"
                    rows="5"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="# street, city"
                    {...profileForm.getFieldProps(
                      'residentialAddress'
                    )}></textarea>

                  {profileForm.touched.residentialAddress &&
                  profileForm.errors.residentialAddress ? (
                    <FormError error={profileForm.errors.residentialAddress} />
                  ) : null}
                </motion.div>

                {/* nationality */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="nationality"
                    className={`text-sm font-semibold mb-2 ${
                      !editting ? 'text-primary-900' : 'text-primary-800'
                    }`}>
                    <div className="flex items-center">
                      <i className="material-icons mr-1">language</i>
                      Nationality
                    </div>
                  </label>
                  <div className="relative">
                    <select
                      className={`${
                        !editting
                          ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                          : 'input-field'
                      }`}
                      id="nationality"
                      name="nationality"
                      disabled={!editting}
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
                  <label
                    htmlFor="state"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div className="flex items-center">
                      <i className="material-icons mr-1">map</i>
                      State/Province
                    </div>
                  </label>
                  <input
                    id="state"
                    name={`state`}
                    type="text"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="State or Province"
                    {...profileForm.getFieldProps('state')}
                  />
                  {profileForm.touched.state && profileForm.errors.state ? (
                    <FormError error={profileForm.errors.state} />
                  ) : null}
                </motion.div>
                {editting && (
                  <motion.div layout className="flex justify-end mt-3 mx-1">
                    <input
                      className="btn bg-secondary text-primary-100"
                      disabled={profileForm.isSubmitting}
                      type="submit"
                      value="Update Profile"
                    />
                  </motion.div>
                )}
              </motion.div>
            </motion.form>
          </motion.div>
        </AnimatePresence>
      </AnimateSharedLayout>
    </div>
  );
};

export default Profile;
