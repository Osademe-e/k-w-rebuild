import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Editor } from '@tinymce/tinymce-react';

// app context
import { AppContext } from '../App';

// hooks
import useFirestore from '../hooks/useFirestore';
import useStorage from '../hooks/useStorage';

// logo
import logo from '../assets/images/logo svg/logo.svg';

// components
import FormError from './FormError';
import { errorDisplayHandler, fileChecker } from '../utils/_helpers';

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

const EditPostForm = () => {
  const {
    modal: {
      post: { collection, details },
    },
    toogleModal,
    toogleToast,
    leagues,
    profile,
  } = useContext(AppContext);

  const firestore = useFirestore();
  const storage = useStorage();

  const [body, setBody] = useState(() => details?.body);
  const [bodyError, setBodyError] = useState('');

  // image state
  const [photo, setPhoto] = useState(null);
  const [tempSrc, setTempSrc] = useState(
    () => details?.photos[Object.keys(details?.photos)[0]].photoURL
  );
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

  const handleEditorChange = (content) => {
    setBodyError('');
    setBody(content);
  };

  const formik = useFormik({
    initialValues: {
      featured: details?.featured,
      headline: details?.headline,
      subHeadline: details?.subHeadline,
      category: details?.category,
    },
    validationSchema: yup.object({
      headline: yup.string().required('Required'),
      subHeadline: yup.string().required('Required'),
      category: yup.string().required('Required'),
      featured: yup.bool(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let uploaded = null;
        if (photo) {
          const oldImgPath =
            details?.photos[Object.keys(details?.photos)[0]].path;

          // prepare request
          const dir = `images/${collection === 'news' ? 'blog' : collection}`;

          const fileType = photo.type.split('/')[1];

          const fileName = `${
            Math.floor(Math.random() * 1e16) + Date.now()
          }.${fileType}`;

          const fileRef = storage.ref().child(`${dir}/${fileName}`);

          // upload new photo
          let uploadTask = await fileRef.put(photo);

          let downloadUrl = await uploadTask.ref.getDownloadURL();

          uploaded = {
            [uploadTask.metadata.name.split('.')[0]]: {
              photoURL: downloadUrl,
              path: uploadTask.metadata.fullPath,
            },
          };

          // delete old image
          await storage.ref().child(oldImgPath).delete();
        }

        let changed = false;
        let update = {};

        if (uploaded) {
          changed = true;
          update = {
            ...update,
            photos: uploaded,
          };
        }

        if (body.trim() !== details?.body.trim()) {
          changed = true;
          update = {
            ...update,
            body,
          };
        }

        Object.keys(values).forEach((key) => {
          if (values[key] !== details?.[key]) {
            changed = true;
            update = {
              ...update,
              [key]: values[key],
            };
          }
        });

        if (changed) {
          update = {
            ...update,
            editedBy: {
              name: `${profile?.doc?.firstName} ${profile?.doc?.lastName}`,
              email: profile?.doc?.email,
            },
          };

          await firestore
            .collection(collection)
            .doc(details?.id)
            .update(update);

          toogleModal({
            open: false,
            component: '',
          });
          toogleToast('Edited');
        } else {
          toogleModal({
            open: false,
            component: '',
          });
          toogleToast('Edited');
        }
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
            <h2 className="font-semibold uppercase">{collection}</h2>
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
          {/* photo */}
          <div className="form-control">
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
                {photoName && (
                  <div className="text-xs p-2 mt-2">{photoName}</div>
                )}
                {photoError && <FormError error={photoError} />}
              </div>
            </div>
          </div>

          {/* headline */}
          <div className="form-control">
            <label htmlFor="headline" className="label">
              Headline
            </label>
            <input
              id="headline"
              name="headline"
              type="text"
              className="input-field"
              {...formik.getFieldProps('headline')}
            />
            {formik.touched.headline && formik.errors.headline ? (
              <FormError error={formik.errors.headline} />
            ) : null}
          </div>

          {/* subheadline */}
          <div className="form-control">
            <label htmlFor="subHeadline" className="label">
              Subheadline
            </label>
            <textarea
              name="subHeadline"
              id="subHeadline"
              rows="2"
              className="input-field focus:border focus:border-primary-900 placeholder-primary-800 placeholder-opacity-25"
              placeholder="subHeadline..."
              {...formik.getFieldProps('subHeadline')}></textarea>

            {formik.touched.subHeadline && formik.errors.subHeadline ? (
              <FormError error={formik.errors.subHeadline} />
            ) : null}
          </div>

          {/* category */}
          <div className="form-control">
            <label
              htmlFor="category"
              className="text-sm font-semibold mb-2 text-primary-800">
              Category
            </label>
            <div className="relative">
              <select
                className="input-field"
                id="category"
                name="category"
                {...formik.getFieldProps('category')}>
                <option>General</option>
                {leagues?.ordered.map((league) => (
                  <option key={league.id}>{league.name}</option>
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
          </div>

          {/* Body */}
          <div className="form-control">
            <label htmlFor="body" className="label">
              Post
            </label>
            <Editor
              initialValue={body}
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

          {/* featured */}
          <div className="form-control">
            <label className="label">Featured</label>
            <div className="text-xs">
              <div className="inline-block relative mr-4">
                <input
                  type="checkbox"
                  name="featured"
                  value={details?.featured}
                  {...formik.getFieldProps('featured')}
                  className="relative z-10 opacity-0"
                />
                <div className="square absolute border border-primary-900 w-3 h-3 top-0 left-0 "></div>
              </div>
            </div>
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

export default EditPostForm;
