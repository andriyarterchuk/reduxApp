import {
  GET_COORDINATES
} from '../actionTypes';

const getCoordinates = coordinates => ({
  type: GET_COORDINATES,
  data: coordinates
});

export {
  getCoordinates
};
