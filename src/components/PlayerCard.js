import React from 'react';
import './styles/PlayerCard.css';
import leftfoot from '../assets/icons/leftfoot.svg';
import rightfoot from '../assets/icons/rightfoot.svg';
import bothfoot from '../assets/icons/bothfoot.svg';
import gk from '../assets/icons/gk.svg';

import { getPositionAbbrev } from '../utils/_helpers';

const PlayerCard = ({ playerInfo }) => {
  return (
    <div className="mb-3">
      <h2 className="my-3 uppercase text-sm text-primary-800 font-bold border-l-2 border-r-2 border-t-2 border-gray-200 pl-1">
        Featured Talent
      </h2>
      <div className="card relative w-48 bg-primary-400 flex flex-col items-center overflow-hidden shadow">
        <div className="image-display relative z-10">
          <div className="p flex flex-col absolute text-primary-500 font-semibold text-sm text-center bg-orange-800 rounded-b p-1">
            <span className="number text-xl">
              {playerInfo.stats.positionNumber}
            </span>
            <span className="position uppercase">
              {getPositionAbbrev(playerInfo.stats.position)}
            </span>
            <span className="mt-2">
              {playerInfo.stats.preferredFoot === 'Gloves' && (
                <img src={gk} alt="gloves" className="w-6 h-6" />
              )}
              {playerInfo.stats.preferredFoot === 'Right' && (
                <img src={leftfoot} alt="left foot" className="w-6 h-6" />
              )}
              {playerInfo.stats.preferredFoot === 'Left' && (
                <img src={rightfoot} alt="left foot" className="w-6 h-6" />
              )}
              {playerInfo.stats.preferredFoot === 'Both' && (
                <img src={bothfoot} alt="left foot" className="w-6 h-6" />
              )}
            </span>
          </div>
          <img
            src={playerInfo.profile.photo.photoURL}
            alt={playerInfo.profile.fullName}
            className="w-full h-full object-contain object-right"
          />
        </div>
        <div className="z-10 bg-primary-400 w-full text-center text-primary-800">
          <div className="uppercase text-sm my-1 font-semibold">
            {playerInfo.profile.fullName}
          </div>
          <div className="info text-sm uppercase border-t-2 border-primary-300 pt-2 pb-10">
            <div className="text-right">
              <div>
                <span className="font-semibold">
                  {playerInfo?.adminReview?.speed || '00'}{' '}
                </span>
                pac
              </div>
              <div>
                <span className="font-semibold">
                  {playerInfo?.adminReview?.shooting || '00'}{' '}
                </span>
                sho
              </div>
              <div>
                <span className="font-semibold">
                  {playerInfo?.adminReview?.passing || '00'}{' '}
                </span>
                pas
              </div>
            </div>
            <div className="text-left pl-1">
              <div>
                <span className="font-semibold">
                  {playerInfo?.adminReview?.dribbling || '00'}{' '}
                </span>
                dri
              </div>
              <div>
                <span className="font-semibold">
                  {playerInfo?.adminReview?.defense || '00'}{' '}
                </span>
                def
              </div>
              <div>
                <span className="font-semibold">
                  {playerInfo?.adminReview?.strength || '00'}{' '}
                </span>
                phy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
