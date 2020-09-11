import React, { useState, useContext } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

// context
import { AppContext } from '../App';

// config
import { timestamp } from '../config/fbConfig';

// hooks
import useFirestore from '../hooks/useFirestore';

// components
import FormError from './FormError';
import ReviewDisplay from './ReviewDisplay';

// utils
import { errorDisplayHandler } from '../utils/_helpers';

const Review = ({ review }) => {
  // context
  const { user, profile, toogleToast } = useContext(AppContext);

  // params
  const { id } = useParams();

  // hooks
  const firestore = useFirestore();

  // state
  const [editting, setEditting] = useState(false);

  // form
  const reviewForm = useFormik({
    initialValues: {
      defense: review?.defense || 0,
      attack: review?.attack || 0,
      speed: review?.speed || 0,
      heading: review?.heading || 0,
      passing: review?.passing || 0,
      shooting: review?.shooting || 0,
      strength: review?.strength || 0,
      vision: review?.vision || 0,
      dribbling: review?.dribbling || 0,
      marking: review?.marking || 0,
      technique: review?.technique || 0,
      positioning: review?.positioning || 0,
      crossing: review?.crossing || 0,
      setPieces: review?.setPieces || 0,
      flair: review?.flair || 0,
      conversationRate: review?.conversationRate || 0,
      shortPass: review?.shortPass || 0,
      longPass: review?.longPass || 0,
      transition: review?.transition || 0,
    },
    validationSchema: yup.object({
      defense: yup.number().min(0).max(100).positive().integer(),
      attack: yup.number().min(0).max(100).positive().integer(),
      speed: yup.number().min(0).max(100).positive().integer(),
      heading: yup.number().min(0).max(100).positive().integer(),
      passing: yup.number().min(0).max(100).positive().integer(),
      shooting: yup.number().min(0).max(100).positive().integer(),
      strength: yup.number().min(0).max(100).positive().integer(),
      vision: yup.number().min(0).max(100).positive().integer(),
      dribbling: yup.number().min(0).max(100).positive().integer(),
      marking: yup.number().min(0).max(100).positive().integer(),
      technique: yup.number().min(0).max(100).positive().integer(),
      positioning: yup.number().min(0).max(100).positive().integer(),
      crossing: yup.number().min(0).max(100).positive().integer(),
      setPieces: yup.number().min(0).max(100).positive().integer(),
      flair: yup.number().min(0).max(100).positive().integer(),
      conversationRate: yup.number().min(0).max(100).positive().integer(),
      shortPass: yup.number().min(0).max(100).positive().integer(),
      longPass: yup.number().min(0).max(100).positive().integer(),
      transition: yup.number().min(0).max(100).positive().integer(),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      let changed = false;

      // check if any input field was changed
      Object.keys(values).forEach((key) => {
        if (review[key] !== values[key]) {
          changed = true;
        }
      });

      if (changed) {
        try {
          let update = {
            ...values,
            updatedAt: timestamp(),
          };

          await firestore.collection('talents').doc(id).update({
            adminReview: update,
          });

          toogleToast('Review Updated.');
          setEditting((prevState) => !prevState);
        } catch (error) {
          toogleToast(errorDisplayHandler(error));
        }
      } else {
        toogleToast('Review Updated.');
        setEditting((prevState) => !prevState);
      }
    },
  });

  return (
    <AnimateSharedLayout>
      <AnimatePresence>
        <motion.div layout className="shadow rounded bg-white px-2 py-3">
          <motion.div layout className="flex justify-between items-center">
            <motion.div layout className="pb-2 border-b border-gray-200">
              <h1 className="uppercase font-semibold text-sm">Review</h1>
              {user &&
                profile?.doc?.role === 'super admin' &&
                review?.updatedAt && (
                  <motion.p className="text-xs opacity-75">
                    Updated:{' '}
                    {moment(review?.updatedAt?.toDate()).format('DD MMM YY')}
                  </motion.p>
                )}
            </motion.div>
            {!editting && user && profile?.doc?.role === 'super admin' && (
              <motion.span
                layout
                className="material-icons shadow-lg text-secondary cursor-pointer"
                onClick={() => setEditting((prevState) => !prevState)}>
                edit
              </motion.span>
            )}
            {editting && user && profile?.doc?.role === 'super admin' && (
              <motion.span
                layout
                className="material-icons shadow-lg text-secondary cursor-pointer"
                onClick={() => setEditting((prevState) => !prevState)}>
                close
              </motion.span>
            )}
          </motion.div>

          {/* review info */}
          {editting && (
            <motion.form
              onSubmit={reviewForm.handleSubmit}
              className="grid grid-cols-2 gap-2 py-3"
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
              }}>
              <motion.div>
                {/* defense */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="defense"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Defense</div>
                  </label>
                  <input
                    id="defense"
                    name="defense"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('defense')}
                  />
                  {reviewForm.touched.defense && reviewForm.errors.defense ? (
                    <FormError error={reviewForm.errors.defense} />
                  ) : null}
                </motion.div>

                {/* attack */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="attack"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Attack</div>
                  </label>
                  <input
                    id="attack"
                    name="attack"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('attack')}
                  />
                  {reviewForm.touched.attack && reviewForm.errors.attack ? (
                    <FormError error={reviewForm.errors.attack} />
                  ) : null}
                </motion.div>

                {/* speed */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="speed"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Speed</div>
                  </label>
                  <input
                    id="speed"
                    name="speed"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('speed')}
                  />
                  {reviewForm.touched.speed && reviewForm.errors.speed ? (
                    <FormError error={reviewForm.errors.speed} />
                  ) : null}
                </motion.div>

                {/* heading */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="heading"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Heading</div>
                  </label>
                  <input
                    id="heading"
                    name="heading"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('heading')}
                  />
                  {reviewForm.touched.heading && reviewForm.errors.heading ? (
                    <FormError error={reviewForm.errors.heading} />
                  ) : null}
                </motion.div>

                {/* passing */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="passing"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Passing</div>
                  </label>
                  <input
                    id="passing"
                    name="passing"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('passing')}
                  />
                  {reviewForm.touched.passing && reviewForm.errors.passing ? (
                    <FormError error={reviewForm.errors.passing} />
                  ) : null}
                </motion.div>

                {/* shooting */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="shooting"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Shooting</div>
                  </label>
                  <input
                    id="shooting"
                    name="shooting"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('shooting')}
                  />
                  {reviewForm.touched.shooting && reviewForm.errors.shooting ? (
                    <FormError error={reviewForm.errors.shooting} />
                  ) : null}
                </motion.div>

                {/* strength */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="strength"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Strength</div>
                  </label>
                  <input
                    id="strength"
                    name="strength"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('strength')}
                  />
                  {reviewForm.touched.strength && reviewForm.errors.strength ? (
                    <FormError error={reviewForm.errors.strength} />
                  ) : null}
                </motion.div>

                {/* vision  */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="vision"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Vision</div>
                  </label>
                  <input
                    id="vision"
                    name="vision"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('vision')}
                  />
                  {reviewForm.touched.vision && reviewForm.errors.vision ? (
                    <FormError error={reviewForm.errors.vision} />
                  ) : null}
                </motion.div>

                {/*dribbling  */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="dribbling"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Dribbling</div>
                  </label>
                  <input
                    id="dribbling"
                    name="dribbling"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('dribbling')}
                  />
                  {reviewForm.touched.dribbling &&
                  reviewForm.errors.dribbling ? (
                    <FormError error={reviewForm.errors.dribbling} />
                  ) : null}
                </motion.div>

                {/*transition  */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="transition"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Transition</div>
                  </label>
                  <input
                    id="transition"
                    name="transition"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('transition')}
                  />
                  {reviewForm.touched.transition &&
                  reviewForm.errors.transition ? (
                    <FormError error={reviewForm.errors.transition} />
                  ) : null}
                </motion.div>
              </motion.div>

              <motion.div>
                {/* marking */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="marking"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Marking</div>
                  </label>
                  <input
                    id="marking"
                    name="marking"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('marking')}
                  />
                  {reviewForm.touched.marking && reviewForm.errors.marking ? (
                    <FormError error={reviewForm.errors.marking} />
                  ) : null}
                </motion.div>

                {/* technique  */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="technique"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Technique</div>
                  </label>
                  <input
                    id="technique"
                    name="technique"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('technique')}
                  />
                  {reviewForm.touched.technique &&
                  reviewForm.errors.technique ? (
                    <FormError error={reviewForm.errors.technique} />
                  ) : null}
                </motion.div>

                {/* positioning  */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="positioning"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Positioning</div>
                  </label>
                  <input
                    id="positioning"
                    name="positioning"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('positioning')}
                  />
                  {reviewForm.touched.positioning &&
                  reviewForm.errors.positioning ? (
                    <FormError error={reviewForm.errors.positioning} />
                  ) : null}
                </motion.div>

                {/* crossing  */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="crossing"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Crossing</div>
                  </label>
                  <input
                    id="crossing"
                    name="crossing"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('crossing')}
                  />
                  {reviewForm.touched.crossing && reviewForm.errors.crossing ? (
                    <FormError error={reviewForm.errors.crossing} />
                  ) : null}
                </motion.div>

                {/* setPieces  */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="setPieces"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Set Pieces</div>
                  </label>
                  <input
                    id="setPieces"
                    name="setPieces"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('setPieces')}
                  />
                  {reviewForm.touched.setPieces &&
                  reviewForm.errors.setPieces ? (
                    <FormError error={reviewForm.errors.setPieces} />
                  ) : null}
                </motion.div>

                {/* flair */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="flair"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Flair</div>
                  </label>
                  <input
                    id="flair"
                    name="flair"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('flair')}
                  />
                  {reviewForm.touched.flair && reviewForm.errors.flair ? (
                    <FormError error={reviewForm.errors.flair} />
                  ) : null}
                </motion.div>

                {/* conversationRate */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="conversationRate"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Conversation Rate</div>
                  </label>
                  <input
                    id="conversationRate"
                    name="conversationRate"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('conversationRate')}
                  />
                  {reviewForm.touched.conversationRate &&
                  reviewForm.errors.conversationRate ? (
                    <FormError error={reviewForm.errors.conversationRate} />
                  ) : null}
                </motion.div>

                {/* shortPass */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="shortPass"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Short Pass</div>
                  </label>
                  <input
                    id="shortPass"
                    name="shortPass"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('shortPass')}
                  />
                  {reviewForm.touched.shortPass &&
                  reviewForm.errors.shortPass ? (
                    <FormError error={reviewForm.errors.shortPass} />
                  ) : null}
                </motion.div>

                {/* longPass */}
                <motion.div layout className="form-control">
                  <label
                    htmlFor="longPass"
                    className={`${
                      !editting
                        ? 'text-sm font-semibold mb-2 text-primary-900'
                        : 'label'
                    }`}>
                    <div>Long Pass</div>
                  </label>
                  <input
                    id="longPass"
                    name="longPass"
                    type="number"
                    disabled={!editting}
                    className={`${
                      !editting
                        ? 'appearance-none w-full py-2 px-2 outline-none text-xs'
                        : 'input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25'
                    }`}
                    placeholder="30"
                    {...reviewForm.getFieldProps('longPass')}
                  />
                  {reviewForm.touched.longPass && reviewForm.errors.longPass ? (
                    <FormError error={reviewForm.errors.longPass} />
                  ) : null}
                </motion.div>

                <motion.div
                  layout
                  className="flex justify-end items-center mt-3 mx-1">
                  <input
                    className="btn bg-secondary text-primary-100"
                    disabled={reviewForm.isSubmitting}
                    type="submit"
                    value={reviewForm.isSubmitting ? 'Updating...' : 'Update'}
                  />
                </motion.div>
              </motion.div>
            </motion.form>
          )}

          <ReviewDisplay review={review} />
        </motion.div>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

export default Review;
