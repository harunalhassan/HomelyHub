import axios from "axios";

import { propertyDetailsAction } from "./propertyDetails-slice";

export const getPropertyDetails=(id) =>async(dispatch)=>{
    try{
        dispatch(propertyDetailsAction.getListRequest())

        const response= await axios(`https://homely-d83cufdny-harunalhassans-projects.vercel.app/`);  //
        if (!response){
            throw new Error ("Could not fetch any propert details")
        }
        const {data}= response.data;
        dispatch(propertyDetailsAction.getPropertyDetails(data));
        }catch (error) {
        dispatch(propertyDetailsAction.getErrors(error.response.data.error))
    }
}