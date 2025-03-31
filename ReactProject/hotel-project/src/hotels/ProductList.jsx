import React, { useEffect } from 'react';
import Product from './Product';
import './ProductList.css';
import { getAllApartments } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { setApartments } from './Redux/Action';

const ProductList = () => {
  const dispatch = useDispatch()

  //קריאת שרת בעת טעינת הקומפוננטה
  useEffect(() => {
    getAllApartments()
      .then(x => {
        dispatch(setApartments(x))  
      })
      .catch(err => {
        alert('קריאת שרת נכשלה')
      })
  }, [])
const apartments=useSelector(x=>x.apartments)

  return (
    <div className="product-list">
      {apartments.map((apartment) => (

        <div key={apartment._id}   ><Product key={apartment._id} apartment={apartment} /></div>
      ))}
    </div>
  );
};

export default ProductList;
