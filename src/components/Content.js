import React from 'react';
import { motion } from 'framer-motion';

const Content = ({ body }) => {
  return (
    <motion.div
      layout
      className="px-2 text-xs py-3"
      dangerouslySetInnerHTML={{ __html: body }}></motion.div>
  );
};

export default Content;
