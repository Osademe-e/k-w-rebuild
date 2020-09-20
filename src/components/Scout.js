import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Scout = ({ scout, index }) => {
  return (
    <motion.tr
      className={`${+index % 2 === 0 ? 'bg-gray-200' : ''} text-sm`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.5 * (index + 1) } }}>
      <td className="px-4 py-2 border-b flex items-center">
        <img src={scout.photo.photoURL} alt="scout" className="w-10" />
        <Link
          to={{ pathname: `/scouts/${scout.id}` }}
          className="ml-2 font-semibold hover:underline">
          {scout.fullName}
        </Link>
      </td>

      <td className="px-4 py-2 border-b hidden lg:table-cell">
        {scout.nationality}
      </td>
    </motion.tr>
  );
};

export default Scout;
