import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import h337 from 'heatmap.js';
import './styles/HeatMap.css';

// helpers
import {
  getPositionAbbrev,
  getGeneralPosition,
  getAlignment,
  generateHeatMap,
} from '../utils/_helpers';

const HeatMap = ({ position }) => {
  useEffect(() => {
    let heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: document.querySelector('.heatmap'),
    });
    // now generate some random data
    let points = [];
    let max = 0;
    let width = document.querySelector('.heatmap').clientWidth;
    let height = document.querySelector('.heatmap').clientHeight;

    let len = 50;

    while (len--) {
      let val = Math.floor(Math.random() * 10);
      // now also with custom radius
      let radius = Math.floor(Math.random() * 10);

      max = Math.max(max, val);
      let point = {
        x: Math.floor(
          generateHeatMap(getPositionAbbrev(position)).x[
            Math.floor(
              Math.random() *
                generateHeatMap(getPositionAbbrev(position)).x.length
            )
          ] * width
        ),
        y: Math.floor(
          generateHeatMap(getPositionAbbrev(position)).y[
            Math.floor(
              Math.random() *
                generateHeatMap(getPositionAbbrev(position)).y.length
            )
          ] * height
        ),
        value: val,
        // radius configuration on point basis
        radius: radius,
      };
      points.push(point);
    }
    // heatmap data format
    let data = {
      max: max,
      data: points,
    };

    // if you have a set of datapoints always use setData instead of addData
    // for data initialization
    heatmapInstance.setData(data);
    heatmapInstance.repaint();
  }, [position]);

  return (
    <motion.div
      layout
      className="w-full shadow rounded bg-white px-2 py-3 mt-4">
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
          <div className="field heatmap">
            <span
              className={`absolute font-semibold text-primary-900 rounded-full bg-primary-500 p-1 z-10`}
              style={getAlignment(getPositionAbbrev(position))}>
              {getPositionAbbrev(position)}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeatMap;
