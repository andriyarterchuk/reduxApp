import {
  GET_COORDINATES
} from '../actionTypes';

const initialState = {
  coordinates: []
};

const main = (state = initialState, action) => {
  switch (action.type) {
    case GET_COORDINATES:
      return {
        ...state,
        coordinates: action.data
      };
    default:
      return state;
  }
};

export default main;
