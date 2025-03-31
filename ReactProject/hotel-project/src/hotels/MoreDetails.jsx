import React, { useEffect, useState } from 'react';
import './MoreDetails.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getApartmentByID } from './api';
import { Buffer } from 'buffer';

//////////לפרטים נוספים

const MoreDetails = () => {
    const params = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [apartment, setApartment] = useState('')
    const { _id } = params;

    //קריאת שרת בעת טעינת הקומפוננטה
    useEffect(() => {
        getApartmentByID(_id)
            .then(x => {
                console.log(x);

                setApartment(x)

            })
            .catch(err => {
                alert('קריאת שרת נכשלה')
            })
    }, [_id])



    const toggleDetails = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="full-screen-container">
            <div className="car-container" onClick={toggleDetails}>
                <div className="car-summary">
                    {/* <img src={`${process.env.PUBLIC_URL}/צילום מסך 2023-12-13 174508.png`} alt={'jj'} className="product_image" /> */}
                    <img height={300}
                        src={apartment.pic ? `data:image/jpg;base64,${Buffer.from(apartment.pic.data).toString('base64')}` : ''}
                        alt={apartment.nameApartment}
                    />

                    <p>{apartment.nameApartment}</p>
                </div>

                {isOpen && (
                    <div className="car-details">
                        <h3>פרטים נוספים:</h3>
                        <h2 className="product_name">{apartment.nameApartment}</h2>
                        <p><span className="product_label">תאור:</span> {apartment.description}</p>
                        <p><span className="product_label">קטגוריה:</span> {apartment.categoryID.nameCategory}</p>
                        <p><span className="product_label">עיר:</span> {apartment.cityID.nameCity}</p>
                        <p><span className="product_label">כתובת:</span> {apartment.adress}</p>
                        <p><span className="product_label">מס' מיטות:</span> {apartment.beds}</p>
                        <p><span className="product_label">תוספות:</span> {apartment.additives}</p>
                        <p><span className="product_label">מחיר:</span> {apartment.price}</p>
                        <p><span className="product_label">מייל בעל הדירה:</span> {apartment.advertiserID.email}</p>
                        <p><span className="product_label">טלפון בעל הדירה:</span> {apartment.advertiserID.phone}</p>
                        <p><span className="product_label">טלפון נוסף בעל הדירה:</span> {apartment.advertiserID.otherPhone}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoreDetails;

