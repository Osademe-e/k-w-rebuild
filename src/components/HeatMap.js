import React from 'react';
import { motion } from 'framer-motion';
import './styles/HeatMap.css';

// helpers
import {
  getPositionAbbrev,
  getGeneralPosition,
  getAlignment,
} from '../utils/_helpers';

const HeatMap = ({ position }) => (
  <motion.div layout className="w-full shadow rounded bg-white px-2 py-3 mt-4">
    <motion.div
      layout
      className="flex items-center justify-between font-semibold text-xs">
      <motion.h2 layout className="uppercase">
        Playing Style
      </motion.h2>
      <motion.span layout className="text-xs">
        {getGeneralPosition(getPositionAbbrev(position))}
      </motion.span>
    </motion.div>
    <motion.div layout className="grid justify-center">
      <div className="field-wrapper my-3">
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
                pos === position
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
  </motion.div>
);

export default HeatMap;
