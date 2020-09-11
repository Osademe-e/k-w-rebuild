// firebase error message handler
export const errorDisplayHandler = (error) => {
  if (error.code) {
    switch (error.code) {
      case 'auth/wrong-password':
        return 'Invalid email/password';
      case 'auth/user-not-found':
        return 'Invalid email/password';
      case 'auth/invalid-email':
        return error.message;
      case 'auth/user-cancelled':
        return error.message;
      default:
        // error users should not see
        return 'Something went wrong. Please refresh the page and try again, if error persist, contact admin.';
    }
  } else {
    return (
      error.message ||
      'Something went wrong. Please refresh the page and try again, if error persist, contact admin.'
    );
  }
};

// page animation
export const pageAnim = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const getPositionAbbrev = (position) => {
  switch (position) {
    case 'Centre Back':
      return 'CB';
    case 'Sweeper':
      return 'SW';
    case 'Left Back':
      return 'LB';
    case 'Right Back':
      return 'RB';
    case 'Left Wing Back':
      return 'LWB';
    case 'Right Wing Back':
      return 'RWB';
    case 'Centre Midfield':
      return 'CM';
    case 'Defensive Midfield':
      return 'DM';
    case 'Attacking Midfield':
      return 'AM';
    case 'Left Midfield':
      return 'LM';
    case 'Right Midfield':
      return 'RM';
    case 'Centre Forward':
      return 'CF';
    case 'Second Striker':
      return 'SS';
    case 'Left Winger':
      return 'LW';
    case 'Right Winger':
      return 'RW';
    default:
      return 'GK';
  }
};

export const getGeneralPosition = (abbv) => {
  switch (abbv) {
    case 'CB':
      return 'Defensive';
    case 'SW':
      return 'Defensive';
    case 'RB':
      return 'Defensive';
    case 'LB':
      return 'Defensive';
    case 'LWB':
      return 'Defensive';
    case 'RWB':
      return 'Defensive';
    case 'DM':
      return 'Midfield';
    case 'CM':
      return 'Midfield';
    case 'AM':
      return 'Midfield';
    case 'LM':
      return 'Midfield';
    case 'RM':
      return 'Midfield';
    case 'CF':
      return 'Attacking';
    case 'SS':
      return 'Attacking';
    case 'LW':
      return 'Attacking';
    case 'RW':
      return 'Attacking';
    default:
      return 'GoalKeeper';
  }
};

export const fileChecker = (file, requiredSize, requiredFormats) => {
  let check = {
    response: false,
    message: '',
  };
  if (file.size > requiredSize) {
    check.message = `File size exceeds required size.`;
    return check;
  }
  if (requiredFormats.indexOf(file.type) === -1) {
    check.message = `Invalid file format.`;
    return check;
  }

  return {
    response: true,
    message: 'All requirements met',
  };
};

export const getAlignment = (pos) => {
  switch (pos) {
    case 'CB':
      return {
        top: '50%',
        left: '25%',
        transform: 'translate(-25%, -50%)',
      };
    case 'SW':
      return {
        top: '50%',
        left: '14%',
        transform: 'translate(-14%, -50%)',
      };
    case 'RB':
      return {
        bottom: '12%',
        left: '25%',
        transform: 'translate(-25%, -12%)',
      };
    case 'LB':
      return {
        top: '12%',
        left: '25%',
        transform: 'translate(-25%, -12%)',
      };
    case 'LWB':
      return {
        top: '12%',
        left: '36%',
        transform: 'translate(-36%, -12%)',
      };
    case 'RWB':
      return {
        bottom: '12%',
        left: '36%',
        transform: 'translate(-36%, -12%)',
      };
    case 'DM':
      return {
        top: '50%',
        left: '39%',
        transform: 'translate(-39%, -50%)',
      };
    case 'CM':
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    case 'AM':
      return {
        top: '50%',
        left: '61%',
        transform: 'translate(-61%, -50%)',
      };
    case 'LM':
      return {
        top: '12%',
        left: '50%',
        transform: 'translate(-50%, -12%)',
      };
    case 'RM':
      return {
        bottom: '12%',
        left: '50%',
        transform: 'translate(-50%, -12%)',
      };
    case 'CF':
      return {
        top: '50%',
        left: '86%',
        transform: 'translate(-86%, -50%)',
      };
    case 'SS':
      return {
        top: '50%',
        left: '75%',
        transform: 'translate(-75%, -50%)',
      };
    case 'LW':
      return {
        top: '12%',
        left: '75%',
        transform: 'translate(-75%, -12%)',
      };
    case 'RW':
      return {
        bottom: '12%',
        left: '75%',
        transform: 'translate(-75%, -12%)',
      };
    default:
      return {
        top: '50%',
        left: '5%',
        transform: 'translate(-5%, -50%)',
      };
  }
};

export const trailingZero = (num) =>
  num.toString().length === 1 ? `0${num}` : num;

export const progressColor = (score) => {
  let colors = ['gray', 'red', 'orange', 'yellow', 'blue', 'green'];

  if (score <= 39) return colors[1];

  if (score > 39 && score <= 44) return colors[2];

  if (score > 44 && score <= 54) return colors[3];

  if (score > 54 && score <= 79) return colors[4];

  if (score > 79 && score <= 100) return colors[5];

  return colors[0];
};

export const abilityTextReadable = (ability) => {
  switch (ability) {
    case 'attack':
      return 'Attack';
    case 'speed':
      return 'Speed';
    case 'heading':
      return 'Heading';
    case 'passing':
      return 'Passing';
    case 'shooting':
      return 'Shooting';
    case 'strength':
      return 'Strength';
    case 'vision':
      return 'Vision';
    case 'dribbling':
      return 'Dribbling';
    case 'marking':
      return 'Marking';
    case 'technique':
      return 'Technique';
    case 'positioning':
      return 'Positioning';
    case 'crossing':
      return 'Crossing';
    case 'setPieces':
      return 'Set Pieces';
    case 'flair':
      return 'Flair';
    case 'conversationRate':
      return 'Conversation Rate';
    case 'shortPass':
      return 'Short Pass';
    case 'longPass':
      return 'Long Pass';
    case 'transition':
      return 'Transition';
    default:
      return 'Defense';
  }
};
