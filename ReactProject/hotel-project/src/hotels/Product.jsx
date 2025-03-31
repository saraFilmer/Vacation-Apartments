import React from 'react';
import './Product.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import { Buffer } from 'buffer';


const Product = ({ apartment }) => {
  const user = useSelector(x => x.currentUser);
  const nav = useNavigate()
  const moreDet = (_id) => {
    if (user.email != null) {
      nav(`/more_details/${_id}`);
    } else {
      swal('!אופס', 'אינך מחובר', 'error');
      nav('/home');
    }
  };

  ////////////כאשר הכנסנו דירה זה מה שרואים 

  return (
    <div className={`product`} onClick={() => moreDet(apartment._id)}>
      <div className="product_image-wrapper">
        {/* <img src={`${process.env.PUBLIC_URL}/צילום מסך 2023-12-13 174508.png`} alt={'jj'} className="product_image" /> */}
        <img height={150} src={`data:image/jpg;base64,${Buffer.from(apartment.pic.data).toString('base64')}`} alt={apartment.nameApartment} />
        </div>
      <div className="product_details">
        <h2 className="product_name">{apartment.nameApartment}</h2>
        <p><span className="product_label">תאור:</span> {apartment.description}</p>
        <p><span className="product_label">קטגוריה:</span> {apartment.categoryID.nameCategory}</p>
        <p><span className="product_label">עיר:</span> {apartment.cityID.nameCity}</p>
        <p><span className="product_label">כתובת:</span> {apartment.adress}</p>
        <p><span className="product_label">מחיר:</span> {apartment.price}</p>
      </div>
    </div>
  );
};

export default Product;
