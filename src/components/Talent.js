import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// app context
import { AppContext } from '../App';

// hooks
import useFirestore from '../hooks/useFirestore';

// helper
import { errorDisplayHandler } from '../utils/_helpers';

const Talent = ({ talent, index }) => {
  // context
  const { toogleModal, toogleToast, user, profile } = useContext(AppContext);

  //   firestore object
  const firestore = useFirestore();

  // function to update tallent
  const toogleTalentFeatured = async (id, isFeatured, name) => {
    try {
      //   update featured
      toogleModal({
        component: 'loader',
        open: true,
        message: `Updating ${name}'s profile...`,
      });

      await firestore
        .collection('talents')
        .doc(id)
        .update({ featured: !isFeatured });

      toogleModal({
        component: '',
        open: false,
        message: null,
      });
      toogleToast(`${name}'s profile updated.`);
    } catch (error) {
      console.log(error);
      toogleModal({
        component: '',
        open: false,
        message: null,
      });
      toogleToast(errorDisplayHandler(error));
    }
  };

  return (
    <motion.tr
      className={`${+index % 2 === 0 ? 'bg-gray-200' : ''} text-sm`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.5 * (index + 1) } }}>
      <td className="px-4 py-2 border-b flex items-center">
        <img
          src={talent.profile.photo.photoURL}
          alt="talent"
          className="w-10"
        />
        <Link
          to={{ pathname: `/talents/${talent.id}` }}
          className="ml-2 font-semibold hover:underline">
          {talent.profile.fullName}
        </Link>
      </td>
      <td className="px-4 py-2 border-b hidden lg:table-cell">
        {talent.stats.position[0]}
      </td>
      <td className="px-4 py-2 border-b hidden lg:table-cell">
        {talent.profile.nationality}
      </td>
      {user && profile?.doc?.role && (
        <td className="px-4 py-2 border-b">
          {/* checkbox */}
          <div className="form-control">
            <div className="text-xs">
              <div className="inline-block relative mr-4">
                <input
                  type="checkbox"
                  name="featured"
                  checked={talent.featured}
                  onChange={() =>
                    toogleTalentFeatured(
                      talent.id,
                      talent.featured,
                      talent.fullName
                    )
                  }
                  className="relative z-10 opacity-0"
                />
                <div className="square absolute border border-primary-900 w-3 h-3 top-0 left-0 "></div>
              </div>
            </div>
          </div>
        </td>
      )}
    </motion.tr>
  );
};

export default Talent;
