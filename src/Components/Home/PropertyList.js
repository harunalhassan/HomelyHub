import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from "react-redux";

import { getAllProperties } from '../../Store/Property/property-action';
import { propertyAction } from '../../Store/Property/property-slice';


import { Link } from 'react-router-dom';
const baseURL = "https://homely-hub-api.vercel.app";
const Card=({id,image , address, price, name})=>{
    return (
        <figure className='property'>

            <Link to={`${baseURL}/propertylist/${id}`}>
            
                <img src={image} alt='Propertyimg' />
            
            </Link>

            <h4>{name}</h4>
            <figcaption>
                <main className='propertydetails'>
                    <h5>{name}</h5>
                    <h6>
                    <span class="material-symbols-outlined houseicon">
                        home_pin
                    </span>
                    {address}
                    </h6>
                    <p>
                        <span>₹{price}/Night</span> 
                    </p>
                </main>
            </figcaption>
        </figure>
        

    );
};


const PropertyList = () => {

  const[currentPage, setCurrentPage] = useState({page:1})
  const { properties, totalProperties} = useSelector(
    (state)=>state.properties
  );
  

   const lastpage = Math.ceil(totalProperties/12);
   const dispatch = useDispatch();

   useEffect(()=>{
       const fetchProperties=async (page) => {
        dispatch(propertyAction.updateSearchParams(page))
        dispatch(getAllProperties());
       }
       fetchProperties(currentPage)
   },[currentPage,dispatch]);   

   
  return (

    <>
            {properties.length ===0 ?(
        <p className="not_found">"property not found....."</p>
    ):(
        <div  className="propertylist">

        {properties.map((property)=>(
            <Card
                key={property._id}
                id={property._id}
                image= {property.images[0].url}
                name={property.propertyName}
                address={`${property.address.city}, ${property.address.state}, ${property.address.pincode}`}
                price={property.price}
            />
        ))
        }

    </div>
    )}


    {/* pagination controls */}

        <div className='pagination'>
            
            {/* previous button */}
            <button className='"previous_btn' onClick={()=>setCurrentPage((prev)=>({page:prev.page-1}))}
                /*disable the previou button if you are in the first page */
                disabled={currentPage.page===1}  
                >
                <span class="material-symbols-outlined">arrow_back_ios</span>
            </button>
            {/* next button */}
            <button className='"next_btn' onClick={()=>setCurrentPage((prev)=>({page:prev.page+1}))}
                /* //disable the previou button if you are in the first page */
                disabled={properties.length < 12 || currentPage.page===lastpage}  
                >

                <span class="material-symbols-outlined">arrow_forward_ios</span>
            </button>
        </div>


    </>

    
    
  )
}

export default PropertyList