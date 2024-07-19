import axios from "axios";
import { CardNumberElement } from "@stripe/react-stripe-js";
import { setPaymentDetails } from "./payment-slice";
import { createBooking } from "../Booking/booking-action";
const baseURL = process.env.REACT_APP_API_BASE_URL || '';

export const processPayment = ({
  totalAmount,
  stripe,
  elements,
  checkinDate,
  checkoutDate,
  propertyName,
  address,
  maximumGuest,
  bookingId,
  propertyId,
  nights,
  dispatch,
  navigate,
}) => {
  return async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      console.log("stripe is not initialized");
      return;
    }
    const cardNumberElement = elements.getElement(CardNumberElement);
    try {
      const response = await axios.post(
        `${baseURL}/api/v1/rent/user/checkout-session`,
        {
          amount: totalAmount,
          currency: "inr",
          paymentMethodTypes: ["card"],
          checkinDate,
          checkoutDate,
          propertyName,
          address,
          maximumGuest,
          bookingId,
          propertyId,
          nights,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardNumberElement,
        },
      });
      dispatch(
        createBooking({
          booking: bookingId,
          property: propertyId,
          price: totalAmount,
          guest: maximumGuest,
          fromDate: checkinDate,
          toDate: checkoutDate,
          nights,
        })
      );
      dispatch(
        setPaymentDetails({
          checkinDate,
          checkoutDate,
          totalPrice: totalAmount,
          propertyName,
          address,
          maximumGuest,
          nights,
        })
      );
      navigate(`/user/booking`);
    } catch (error) {
      console.error("Error processing payment: ", error);
    }
  };
};
