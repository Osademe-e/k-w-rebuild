import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import moment from 'moment';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import './styles/Stats.css';

// context
import { AppContext } from '../App';

// hooks
import useFirestore from '../hooks/useFirestore';

// components
import FormError from './FormError';

// helpers
import {
  errorDisplayHandler,
  getPositionAbbrev,
  getGeneralPosition,
  getAlignment,
} from '../utils/_helpers';

// config
import { timestamp } from '../config/fbConfig';

// import pitch from '../assets/images/pitch.png';

const Stats = ({ stats }) => {
  // context
  const { user, toogleModal, toogleToast } = useContext(AppContext);

  // hooks
  const firestore = useFirestore();

  // edit state
  const [editting, setEditting] = useState(false);

  // talent id
  const { id } = useParams();

  // stats form
  const statsForm = useFormik({
    initialValues: {
      localClub: stats.localClub,
      coach: stats.coach,
      trainingSite: stats.trainingSite,
      preferredFoot: stats.preferredFoot,
      position: stats.position,
      positionNumber: stats.positionNumber,
      appearances: stats.appearances,
      goals: stats.goals,
      assists: stats.assists,
      cleanSheets: stats.cleanSheets,
    },
    validationSchema: yup.object({
      localClub: yup.string().required('Required'),
      coach: yup.string().required('Required'),
      trainingSite: yup.string().required('Required'),
      preferredFoot: yup.string().required('Required'),
      position: yup.string().required('Required'),
      positionNumber: yup.number().required('Required'),
      appearances: yup.number().required('Required'),
      goals: yup.number().required('Required'),
      assists: yup.number().required('Required'),
      cleanSheets: yup.number().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      let changed = false;
      toogleModal({
        open: true,
        component: 'loader',
        message: 'Updating Stats...',
      });

      // check if any input field was changed
      Object.keys(values).forEach((key) => {
        if (stats[key] !== values[key]) {
          changed = true;
        }
      });

      if (changed) {
        try {
          const update = {
            ...stats,
            ...values,
            updatedAt: timestamp(),
          };

          // update firestore
          await firestore
            .collection('talents')
            .doc(id)
            .update({ stats: update });
          setEditting((prevState) => !prevState);
          toogleModal({
            open: false,
            component: '',
            message: null,
          });
          toogleToast('Stats updated.');
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
        toogleToast('Stats updated.');
      }
    },
  });

  return (
    <AnimateSharedLayout>
      <motion.div
        layout
        className="w-full shadow rounded bg-white px-2 py-3 mt-4">
        <motion.div layout className="flex justify-between items-center">
          <div className="pb-2 border-b border-gray-200">
            <h1 className="uppercase font-semibold text-sm">Stats</h1>
            {user?.uid === id && (
              <p className="text-xs opacity-75">
                Updated:{' '}
                {moment(
                  stats.updatedAt?.seconds
                    ? stats.updatedAt?.toDate()
                    : stats.updatedAt
                ).format('DD MMM YY')}
              </p>
            )}
          </div>

          {!editting && user?.uid === id && (
            <motion.span
              layout
              className="material-icons shadow-lg text-secondary cursor-pointer"
              onClick={() => setEditting((prevState) => !prevState)}>
              edit
            </motion.span>
          )}
        </motion.div>
        <motion.div layout className="py-3">
          <motion.div
            layout
            className="flex items-center justify-between font-semibold text-xs">
            <motion.h2 layout className="uppercase">
              Playing Style
            </motion.h2>
            <motion.span layout className="text-xs">
              {getGeneralPosition(getPositionAbbrev(stats.position))}
            </motion.span>
          </motion.div>
          <motion.div layout className="grid justify-center">
            <div className="field-wrapper border border-green-600 my-3">
              <div className="field">
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
                  <span
                    key={i}
                    className={`absolute ${
                      pos === stats.position
                        ? 'font-semibold text-primary-900 rounded-full bg-primary-500 p-1'
                        : 'text-white'
                    }`}
                    style={getAlignment(getPositionAbbrev(pos))}>
                    {getPositionAbbrev(pos)}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            <motion.div layout className={` py-2 w-full`}>
              <motion.form layout onSubmit={statsForm.handleSubmit}>
                <motion.div layout className="py-3">
                  {/* local club */}
                  <motion.div layout className="form-control">
                    <label
                      htmlFor="localClub"
                      className={`${
                        !editting
                          ? 'text-sm font-semibold mb-2 text-primary-900'
                          : 'label'
                      }`}>
                      <div className="flex items-center">
                        <i className="material-icons mr-1">sports_soccer</i>
                        Local Club
                      </div>
                    </label>
                    <input
                      id="localClub"
                      name={`localClub`}
                      disabled={!editting}
                      type="text"
                      className={`${
                        !editting
                          ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                          : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                      }`}
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
                    <label
                      htmlFor="coach"
                      className={`${
                        !editting
                          ? 'text-sm font-semibold mb-2 text-primary-900'
                          : 'label'
                      }`}>
                      <div className="flex items-center">
                        <i className="material-icons mr-1">person</i>
                        Coach/Trainer
                      </div>
                    </label>
                    <input
                      id="coach"
                      name={`coach`}
                      disabled={!editting}
                      type="text"
                      className={`${
                        !editting
                          ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                          : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                      }`}
                      placeholder="John Doe"
                      {...statsForm.getFieldProps('coach')}
                    />
                    {statsForm.touched.coach && statsForm.errors.coach ? (
                      <FormError error={statsForm.errors.coach} />
                    ) : null}
                  </motion.div>

                  {/* training site */}
                  <motion.div layout className="form-control">
                    <label
                      htmlFor="trainingSite"
                      className={`${
                        !editting
                          ? 'text-sm font-semibold mb-2 text-primary-900'
                          : 'label'
                      }`}>
                      <div className="flex items-center">
                        <i className="material-icons mr-1">my_location</i>
                        Training Site
                      </div>
                    </label>
                    <input
                      id="trainingSite"
                      name={`trainingSite`}
                      disabled={!editting}
                      type="text"
                      className={`${
                        !editting
                          ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                          : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                      }`}
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
                      className={`text-sm font-semibold mb-2 ${
                        !editting ? 'text-primary-900' : 'text-primary-800'
                      }`}>
                      <div className="flex items-center">
                        <i className="material-icons mr-1">star_rate</i>
                        Preferred Foot
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
                      className={`text-sm font-semibold mb-2 ${
                        !editting ? 'text-primary-900' : 'text-primary-800'
                      }`}>
                      <div className="flex items-center">
                        <i className="material-icons mr-1">
                          location_searching
                        </i>
                        Position
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
                    <label
                      htmlFor="positionNumber"
                      className={`${
                        !editting
                          ? 'text-sm font-semibold mb-2 text-primary-900'
                          : 'label'
                      }`}>
                      <div className="flex items-center">
                        <i className="material-icons mr-1">looks_one</i>
                        Position Number
                      </div>
                    </label>
                    <input
                      id="positionNumber"
                      name="positionNumber"
                      disabled={!editting}
                      type="number"
                      className={`${
                        !editting
                          ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                          : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                      }`}
                      placeholder="100"
                      {...statsForm.getFieldProps('positionNumber')}
                    />
                    {statsForm.touched.positionNumber &&
                    statsForm.errors.positionNumber ? (
                      <FormError error={statsForm.errors.positionNumber} />
                    ) : null}
                  </motion.div>

                  {/* appearances */}
                  <motion.div layout className="form-control">
                    <label
                      htmlFor="appearances"
                      className={`${
                        !editting
                          ? 'text-sm font-semibold mb-2 text-primary-900'
                          : 'label'
                      }`}>
                      <div className="flex items-center">
                        <i className="material-icons mr-1">camera</i>
                        Appearances
                      </div>
                    </label>
                    <input
                      id="appearances"
                      name="appearances"
                      disabled={!editting}
                      type="number"
                      className={`${
                        !editting
                          ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                          : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                      }`}
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
                    <label
                      htmlFor="goals"
                      className={`${
                        !editting
                          ? 'text-sm font-semibold mb-2 text-primary-900'
                          : 'label'
                      }`}>
                      <div className="flex items-center">
                        <i className="material-icons mr-1">sports_soccer</i>
                        Goals
                      </div>
                    </label>
                    <input
                      id="goals"
                      name="goals"
                      disabled={!editting}
                      type="number"
                      className={`${
                        !editting
                          ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                          : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                      }`}
                      placeholder="100"
                      {...statsForm.getFieldProps('goals')}
                    />
                    {statsForm.touched.goals && statsForm.errors.goals ? (
                      <FormError error={statsForm.errors.goals} />
                    ) : null}
                  </motion.div>

                  {/* assists */}
                  <motion.div layout className="form-control">
                    <label
                      htmlFor="assists"
                      className={`${
                        !editting
                          ? 'text-sm font-semibold mb-2 text-primary-900'
                          : 'label'
                      }`}>
                      <div className="flex items-center">
                        <i className="material-icons mr-1">thumb_up</i>
                        Assists
                      </div>
                    </label>
                    <input
                      id="assists"
                      name="assists"
                      type="number"
                      disabled={!editting}
                      className={`${
                        !editting
                          ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                          : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                      }`}
                      placeholder="100"
                      {...statsForm.getFieldProps('assists')}
                    />
                    {statsForm.touched.assists && statsForm.errors.assists ? (
                      <FormError error={statsForm.errors.assists} />
                    ) : null}
                  </motion.div>

                  {/* cleanSheets */}
                  <motion.div layout className="form-control">
                    <label
                      htmlFor="cleanSheets"
                      className={`${
                        !editting
                          ? 'text-sm font-semibold mb-2 text-primary-900'
                          : 'label'
                      }`}>
                      <div className="flex items-center">
                        <i className="material-icons mr-1">sports_mma</i>
                        Clean Sheets
                      </div>
                    </label>
                    <input
                      id="cleanSheets"
                      name="cleanSheets"
                      type="number"
                      disabled={!editting}
                      className={`${
                        !editting
                          ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                          : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                      }`}
                      placeholder="100"
                      {...statsForm.getFieldProps('cleanSheets')}
                    />
                    {statsForm.touched.cleanSheets &&
                    statsForm.errors.cleanSheets ? (
                      <FormError error={statsForm.errors.cleanSheets} />
                    ) : null}
                  </motion.div>

                  {editting && (
                    <motion.div layout className="flex justify-end mt-3 mx-1">
                      <input
                        className="btn bg-secondary text-primary-100"
                        disabled={statsForm.isSubmitting}
                        type="submit"
                        value="Update Stats"
                      />
                    </motion.div>
                  )}
                </motion.div>
              </motion.form>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimateSharedLayout>
  );
};

export default Stats;
