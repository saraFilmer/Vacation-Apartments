import React, { useEffect, useState } from 'react';
import SelectButton from './SelectButton';
import './ButtonsContainer.css';
import { useDispatch, useSelector } from 'react-redux';
import { setApartments, setCategories, setCities } from './Redux/Action';
import { getAllApartments, getAllCategories, getAllCities, getApartmentByBed, getApartmentByPrice, getMyApartments } from './api';

const ButtonsContainer = () => {
  const dispatch = useDispatch();
  const [bedOpen, setBedOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [small, setSmall] = useState(null);
  const [big, setBig] = useState(null);
  const currentUser = useSelector(x => x.currentUser);

  //קריאת שרת בעת טעינת הקומפוננטה
  useEffect(() => {
    getAllCategories()
      .then(x => {
        dispatch(setCategories(x));
      })
      .catch(err => {
        alert('קריאת שרת נכשלה');
      });

    getAllCities()
      .then(x => {
        dispatch(setCities(x));
      })
      .catch(err => {
        alert('קריאת שרת נכשלה');
      });
  }, []);
    //שליפת המערכים מהסטור
  const arr_category = useSelector(x => x.categories.categories);
  const arr_city = useSelector(x => x.cities.cites);

  const buttonData = [
    {
      id: 'city',
      label: 'city',
      options: arr_city
    },
    {
      id: 'category',
      label: 'category',
      options: arr_category
    },
  ];

  const beds = () => {
    setBedOpen(!bedOpen);
  };

  const price = () => {
    setPriceOpen(!priceOpen);
  };

  const cancelFilter = async () => {
    const app = await getAllApartments();
    dispatch(setApartments(app));
  };

  const filterBed = async () => {
    if (small != null || big != null) {
      const app = await getApartmentByBed(small, big);
      dispatch(setApartments(app));
    }
  };

  const filterPrice = async () => {
    if (small != null || big != null) {
      const app = await getApartmentByPrice(small, big);
      dispatch(setApartments(app));
    }
  };

  const myApartments = async () => {
    if (currentUser._id) {
      const app = await getMyApartments(currentUser._id);
      dispatch(setApartments(app));
    }
    else
    alert("אינך מחובר למערכת");
  };

  return (
    <div className="buttons-container">
      {buttonData.map(button => (
        <SelectButton key={button.id} id={button.id} label={button.label} options={button.options} />
      ))}

      <div>
        <button onClick={beds}>מספר מיטות</button>
        {bedOpen && (
          <div className="input-container">
            <input
              placeholder='גדול מ'
              value={small}
              onChange={(e) => setSmall(e.target.value)}
            />
            <input
              placeholder='קטן מ'
              value={big}
              onChange={(e) => setBig(e.target.value)}
            />
            <button onClick={filterBed}>לאישור</button>
          </div>
        )}
      </div>

      <div>
        <button onClick={price}>מחיר</button>
        {priceOpen && (
          <div className="input-container">
            <input
              placeholder='גדול מ'
              value={small}
              onChange={(e) => setSmall(e.target.value)}
            />
            <input
              placeholder='קטן מ'
              value={big}
              onChange={(e) => setBig(e.target.value)}
            />
            <button onClick={filterPrice}>לאישור</button>
          </div>
        )}
      </div>

      {currentUser && (
        <div>
          <button onClick={myApartments}>הדירות שלי</button>
        </div>
      )}
      <button onClick={cancelFilter} className="filter2">בטל סינונים</button>
    </div>
  );
};

export default ButtonsContainer;
