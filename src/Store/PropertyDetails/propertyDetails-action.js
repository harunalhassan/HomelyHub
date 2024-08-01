import axios from "axios";
import { propertyDetailsAction } from "./propertyDetails-slice";
const baseURL = process.env.REACT_APP_API_BASE_URL || '';

export const getPropertyDetails = (id) => async (dispatch) => {
  try {
    dispatch(propertyDetailsAction.getListRequest());
    const response = await axios(`${baseURL}/api/v1/rent/listing/${id}`);

    if (!response) {
      throw new Error("could not fetch any property details");
    }
    const { data } = response.data;
    console.log(data);
    dispatch(propertyDetailsAction.getPropertyDetails(data));
  } catch (error) {
    dispatch(propertyDetailsAction.getErrors(error.response.data.error));
  }
};
