import React, { useState } from 'react';
import './SelectButton.css';
import { useDispatch, useSelector } from 'react-redux';
import { setApartments, setCurrentCars } from './Redux/Action';
import { getApartmentByCategory, getApartmentByCity } from './api';

const SelectButton = (props) => {
    const { label, options, id } = props;
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    var apartments
    const toggleSelectMenu = () => {
        setIsOpen(!isOpen);
    };

    async function handleChange(event) {
        
        const selectedValue = event.target.value; 

        if (selectedValue) {
            if (label == "city") {
                const app=await getApartmentByCity(selectedValue)
                dispatch(setApartments(app))
                
            }
            else if (label == "category"){
                const app=await getApartmentByCategory(selectedValue)
                dispatch(setApartments(app))
            }

            setIsOpen(false)
        }
    }


    //////////////מיון לפי עיר וקטגוריה
    return (
        <div className="select-button-container">
            <button onClick={toggleSelectMenu} className="select-button">
                {label=="city"&&<p>עיר</p>}
                {label=="category"&&<p>קטגוריה</p>}

            </button>
            {isOpen && (
                <div className="select-menu">
                    <select onChange={handleChange} className="select-dropdown" defaultValue="">
                        <option value="" disabled>מיון על פי: </option>
                        {options.map((option, index) => (

                            label == "city" && <option key={index} value={option._id}>
                                {option.nameCity} </option> ||
                            label == "category" && <option key={index} value={option._id}>
                                {option.nameCategory} </option>

                        ))}
                    </select>
                </div>
            )}
        </div>
    )
}


export default SelectButton;
