import axios from "axios";
import {
  STATISTIC_FAIL,
  STATISTIC_REQUEST,
  STATISTIC_SUCCESS,
} from "../constants/statisticConstants";

export const seeStatistic = (option) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STATISTIC_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `http://localhost:8080/api/statistics`,
      option,
      config
    );
    dispatch({
      type: STATISTIC_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message) {
      dispatch({
        type: STATISTIC_FAIL,
        payload: message,
      });
    }
  }
};
