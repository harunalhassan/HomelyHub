import axios from "axios";
import { propertyAction } from "./property-slice";
const baseURL = process.env.REACT_APP_API_BASE_URL || '';


//action creater to fetch properties 
export const getAllProperties = () => async(dispatch,getState)=>{
    try{
        dispatch(propertyAction.getRequest());
        const {searchParams} = getState().properties;
        const response = await axios.get(`xyz/api/v1/rent/listing`, { 
            params: { ...searchParams },
            });
            if (!response) {
                throw new Error("Could not fetch any properties"); 
            }
            const { data } = response;
            dispatch(propertyAction.getProperties(data));
            } catch (error){
            dispatch(propertyAction.getErrors(error.message));
            }

    };
