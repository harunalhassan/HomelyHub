import axios from "axios";
import { propertyDetailsAction } from "./propertyDetails-slice";
const baseURL = 'https://homely-hub-api.vercel.app/';

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
