import React from 'react';
import { Link } from 'react-router-dom';

const TalentsDisplay = ({ featuredTalents }) => {
  return (
    <div className="hidden lg:flex text-primary-100 text-sm py-1">
      <h2 className="mr-2">Talents</h2>
      {featuredTalents && (
        <div className="flex justify-start">
          {featuredTalents
            .filter((talent) => talent.featured === true)
            .map((talent, i) => (
              <Link to={`/talents/${talent.id}`} key={talent.id}>
                <img
                  src={talent.profile.photo.photoURL}
                  alt={talent.id}
                  className={`w-6 h-6 rounded-full border border-primary-400`}
                />
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default TalentsDisplay;
