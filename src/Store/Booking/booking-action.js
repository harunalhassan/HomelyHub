import axios from "axios";
import  {
addBooking, 
setBookings, 
setBookingDetails,
} from"./booking-slice";
import { isAction } from "@reduxjs/toolkit";
export const createBooking= (bookingDate) => async (dispatch) =>{
try {
const response= await axios.post(
"https://homely-hub-api.vercel.app/api/v1/rent/user/booking/new",
bookingDate
) ;
dispatch(addBooking(response.data.data.booking));
} catch (error) {
console.error("Error creating booking:", error);

}
}


export const fetchBookingDetails = (bookingId)=>async (dispatch)=>{
    try{
        const response =await axios.get(`https://homely-hub-api.vercel.app/api/v1/rent/user/booking/${bookingId}`);
        dispatch(setBookingDetails(response.data.data))
    }
    catch(error){
        console.error("Error fetching booking details",error)
    }
}
export const fetchUserbookings =( )=>async(dispatch)=>{
    try{
        const response =await axios.get("https://homely-hub-api.vercel.app/api/v1/rent/user/booking")
        dispatch(setBookings (response.data.data.bookings)  )
    }catch(error){
        console.error("Error fetching bookings:",error)
    }
}
