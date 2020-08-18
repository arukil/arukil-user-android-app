const initialLocationState = {
  location: {}
};

export function locationReducer(state = initialLocationState, action) {

  switch (action.type) {
    case 'CURRENT_LOCATION':
      return {
        location: action.data
      };

    default:
      return state;
  }
}



