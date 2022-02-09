import {
  STATISTIC_FAIL,
  STATISTIC_REQUEST,
  STATISTIC_SUCCESS,
} from "../constants/statisticConstants";
export const statisticReducer = (
  state = { loading: false, data: null, error: null },
  action
) => {
  switch (action.type) {
    case STATISTIC_REQUEST: {
      return { ...state, loading: true };
    }
    case STATISTIC_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case STATISTIC_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
