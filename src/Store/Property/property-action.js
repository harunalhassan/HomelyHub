import axios from "axios";
import { propertyAction } from "./property-slice";


export const getAllProperties= ( ) => async (dispatch, getState) => {
    try{
        dispatch(propertyAction.getRequest());
        const { searchParams} =getState().properties;

        const response= await axios.get(`https://homely-d83cufdny-harunalhassans-projects.vercel.app/`,{
            params:{...searchParams},
        })

        if(!response){
            throw new Error("Could not fetch any properties")
        }
        const {data}= response;
        dispatch(propertyAction.getProperties(data));
    } catch(error){
        dispatch(propertyAction.getErrors(error.message))
    }


    
}

