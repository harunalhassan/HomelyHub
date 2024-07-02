import React,{useEffect,useState} from 'react'
import FilterModal from './FilterModal'
import { useDispatch} from 'react-redux'
import { getAllProperties } from '../../Store/Property/property-action'
import { propertyAction } from '../../Store/Property/property-slice'

const Filter = () => {
    // state for controlling modal visiblity
    const[isModalOpen,setIsModalOpen]=useState(false)
    // state for storing selected filters
    const[selectedFilters,setSelectedFilters]=useState({})

    const dispatch= useDispatch();
    useEffect(()=>{
        dispatch(propertyAction.updateSearchParams(selectedFilters));
        dispatch(getAllProperties());
    },[selectedFilters,dispatch])

    //funcrtion to handle the opening the modal/pop up window
    const handleOpenModal=()=>{
        setIsModalOpen(true); // sets the isModalOpen to true to open the modal
    }


    const handleCloseModal=()=>{
        setIsModalOpen(false);//seta isModalOpen to false to close the modal
    }

    //funtion to handle the changes in filters
    const handleFilterChange =(filterName,value)=>{
        //updates the filters 
        setSelectedFilters((prevFilters)=>({
            ...prevFilters,
            [filterName]:value,
        }))

    }

  return (
    <>
    <span class="material-symbols-outlined filter" onClick={handleOpenModal}>tune</span>
    {isModalOpen && (
        <FilterModal
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClose={handleCloseModal}

        />
    )}

    </>
  )
}

export default Filter