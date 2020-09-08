import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import moment from 'moment';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

// context
import { AppContext } from '../App';

// hooks
import useFirestore from '../hooks/useFirestore';

// components
import FormError from './FormError';

// helpers
import { errorDisplayHandler } from '../utils/_helpers';

// config
import { timestamp } from '../config/fbConfig';

const Biometrics = ({ biometrics }) => {
  // context
  const { user, toogleModal, toogleToast } = useContext(AppContext);

  // hooks
  const firestore = useFirestore();

  // edit state
  const [editting, setEditting] = useState(false);

  // talent id
  const { id } = useParams();

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
      let changed = false;
      toogleModal({
        open: true,
        component: 'loader',
        message: 'Updating Biometrics...',
      });

      // check if any input field was changed
      Object.keys(values).forEach((key) => {
        if (biometrics[key] !== values[key]) {
          changed = true;
        }
      });

      if (changed) {
        try {
          const update = {
            ...biometrics,
            ...values,
            updatedAt: timestamp(),
          };

          // update firestore
          await firestore
            .collection('talents')
            .doc(id)
            .update({ biometrics: update });
          setEditting((prevState) => !prevState);
          toogleModal({
            open: false,
            component: '',
            message: null,
          });
          toogleToast('Biometrics updated.');
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
        toogleToast('Biometrics updated.');
      }
    },
  });

  return (
    <div className="shadow rounded bg-white px-2 py-3 mt-4">
      <div className="flex justify-between items-center">
        <div className="pb-2 border-b border-gray-200">
          <h1 className="uppercase font-semibold text-sm">Biometrics</h1>
          {user.uid === id && (
            <p className="text-xs opacity-75">
              Updated:{' '}
              {moment(
                biometrics.updatedAt?.seconds
                  ? biometrics.updatedAt?.toDate()
                  : biometrics.updatedAt
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

      {/* biometrics */}
      <AnimateSharedLayout>
        <AnimatePresence>
          <motion.div layout className={` py-2 w-full`}>
            <motion.form layout onSubmit={biometricsForm.handleSubmit}>
              <motion.div layout className="py-3">
                {/* date of birth */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="dateOfBirth"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div className="flex items-center">
                      <i className="material-icons mr-1">calendar_today</i>
                      Date of Birth
                    </div>
                  </label>
                  <input
                    id="dateOfBirth"
                    name={`dateOfBirth`}
                    type="date"
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    disabled={!editting}
                    {...biometricsForm.getFieldProps('dateOfBirth')}
                  />
                  {biometricsForm.touched.dateOfBirth &&
                  biometricsForm.errors.dateOfBirth ? (
                    <FormError error={biometricsForm.errors.dateOfBirth} />
                  ) : null}
                </motion.div>

                {/* gender */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="gender"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div className="flex items-center">
                      <i className="material-icons mr-1">face</i>
                      Gender
                    </div>
                  </label>
                  <div className="relative">
                    <select
                      className={`${
                        !editting
                          ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                          : 'input-field'
                      }`}
                      disabled={!editting}
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
                  <label
                    htmlFor="height"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div className="flex items-center">
                      <i className="material-icons mr-1">height</i>
                      Height <small>(cm)</small>
                    </div>
                  </label>
                  <input
                    id="height"
                    name="height"
                    type="number"
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    disabled={!editting}
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
                  <label
                    htmlFor="weight"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div className="flex items-center">
                      <i className="material-icons mr-1">fitness_center</i>
                      Weight <small>(kg)</small>
                    </div>
                  </label>
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    disabled={!editting}
                    placeholder="60"
                    {...biometricsForm.getFieldProps('weight')}
                  />
                  {biometricsForm.touched.weight &&
                  biometricsForm.errors.weight ? (
                    <FormError error={biometricsForm.errors.weight} />
                  ) : null}
                </motion.div>

                {editting && (
                  <motion.div layout className="flex justify-end mt-3 mx-1">
                    <input
                      className="btn bg-secondary text-primary-100"
                      disabled={biometricsForm.isSubmitting}
                      type="submit"
                      value="Update Bio"
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

export default Biometrics;
