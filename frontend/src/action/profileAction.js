import axios from "axios";
import { UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "../constants/userConstants";

//update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST })

    const config = { headers: { "Content-Type": "multipart/form-data" } };


    const { data } = await axios.put("/api/v1/me/update", userData, config)
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    })
  }
}

