import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Editor } from '@tinymce/tinymce-react';

// config
import { timestamp } from '../config/fbConfig';

// app context
import { AppContext } from '../App';

// hooks
import useFirestore from '../hooks/useFirestore';

// components
import FormError from './FormError';
import { errorDisplayHandler } from '../utils/_helpers';

const replyFormVariants = {
  hidden: {
    opacity: 0,
    bottom: -100,
  },
  visible: {
    opacity: 1,
    bottom: 0,
    transition: {
      delay: 0.2,
      duration: 0.1,
    },
  },
};

const PremiumPostForm = () => {
  const { toogleModal, toogleToast } = useContext(AppContext);

  const firestore = useFirestore();

  const [body, setBody] = useState(null);
  const [bodyError, setBodyError] = useState('');

  const handleEditorChange = (content) => {
    setBodyError('');
    setBody(content);
  };

  const formik = useFormik({
    initialValues: {
      league: '',
      homeTeam: '',
      awayTeam: '',
      result: '',
    },
    validationSchema: yup.object({
      league: yup.string().required('Required'),
      homeTeam: yup.string().required('Required'),
      awayTeam: yup.string().required('Required'),
      result: yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      if (!body || body.trim() === '') {
        setBodyError('Required');
        return setSubmitting(false);
      }

      try {
        let update = {
          ...values,
          body,
          createdAt: timestamp(),
        };

        await firestore.collection('premium').add(update);
        toogleModal({
          open: false,
          component: '',
        });
        toogleToast('Posted');
      } catch (error) {
        setSubmitting(false);
        toogleToast(errorDisplayHandler(error));
      }
    },
  });

  return (
    <motion.div
      variants={replyFormVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="absolute w-full">
      <div className=" w-full lg:w-1/2 lg:mx-auto rounded-t px-2 py-4 bg-white max-h-screen overflow-x-hidden overflow-y-scroll">
        <form onSubmit={formik.handleSubmit}>
          <div className="py-2   px-2 flex items-center justify-between">
            <h2 className="font-semibold uppercase">Premium</h2>
            <span
              className="material-icons cursor-pointer"
              onClick={() =>
                toogleModal({
                  open: false,
                  component: '',
                })
              }>
              close
            </span>
          </div>

          {/* league */}
          <div className="form-control">
            <label htmlFor="league" className="label">
              League
            </label>
            <input
              id="league"
              name="league"
              type="text"
              className="input-field"
              {...formik.getFieldProps('league')}
            />
            {formik.touched.league && formik.errors.league ? (
              <FormError error={formik.errors.league} />
            ) : null}
          </div>

          {/* home team */}
          <div className="form-control">
            <label htmlFor="homeTeam" className="label">
              Home Team
            </label>
            <input
              id="homeTeam"
              name="homeTeam"
              type="text"
              className="input-field"
              {...formik.getFieldProps('homeTeam')}
            />
            {formik.touched.homeTeam && formik.errors.homeTeam ? (
              <FormError error={formik.errors.homeTeam} />
            ) : null}
          </div>

          {/* away team */}
          <div className="form-control">
            <label htmlFor="awayTeam" className="label">
              Away Team
            </label>
            <input
              id="awayTeam"
              name="awayTeam"
              type="text"
              className="input-field"
              {...formik.getFieldProps('awayTeam')}
            />
            {formik.touched.awayTeam && formik.errors.awayTeam ? (
              <FormError error={formik.errors.awayTeam} />
            ) : null}
          </div>

          {/* result */}
          <div className="form-control">
            <label htmlFor="result" className="label">
              Result
            </label>
            <input
              id="result"
              name="result"
              type="text"
              className="input-field"
              {...formik.getFieldProps('result')}
            />
            {formik.touched.result && formik.errors.result ? (
              <FormError error={formik.errors.result} />
            ) : null}
          </div>

          {/* Body */}
          <div className="form-control">
            <label htmlFor="body" className="label">
              Reason
            </label>
            <Editor
              initialValue=""
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar: `undo redo | formatselect | bold italic backcolor |
             alignleft aligncenter alignright alignjustify |
             bullist numlist outdent indent | removeformat | help`,
              }}
              onEditorChange={handleEditorChange}
            />
            {bodyError ? <FormError error={bodyError} /> : null}
          </div>

          <input
            value={formik.isSubmitting ? 'Posting...' : 'Post'}
            type="submit"
            disabled={formik.isSubmitting}
            className="btn bg-secondary text-white text-xs lg:text-sm mx-2"
          />
        </form>
      </div>
    </motion.div>
  );
};

export default PremiumPostForm;
