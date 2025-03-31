import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { useEffect, useState } from 'react';
import { addApartmentStore, setCategories, setCities } from './Redux/Action';
import { useNavigate } from 'react-router';
import { createApartment, getAllCategories, getAllCities } from './api';


//להוסיף דירה
export const AddApartment = () => {
    const [newApartment, setNewApartment] = useState({});
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const nav = useNavigate();   
     //שליפת המערכים מהסטור
    const currentUser = useSelector(x => x.currentUser);


    const handleSaveApartment = () => {
        const newErrors = {};
        // בדיקות שדות ריקים
        if (!newApartment.nameApartment) newErrors.nameApartment = 'שדה שם הדירה הוא חובה';
        if (!newApartment.adress) newErrors.adress = 'שדה כתובת הוא חובה';
        if (!newApartment.cityID) newErrors.cityID = 'יש לבחור עיר';
        if (!newApartment.categoryID) newErrors.categoryID = 'יש לבחור קטגוריה';
        if (!newApartment.beds) newErrors.beds = 'שדה מיטות הוא חובה';
        if (!newApartment.price) newErrors.price = 'שדה מחיר הוא חובה';
        if (!newApartment.pic) newErrors.pic = 'יש להעלות תמונה';
        // אם אין שגיאות, שלח את הדירה
        if (Object.keys(newErrors).length === 0) {
            const formData = new FormData();
            Object.keys(newApartment).forEach(key => {
                formData.append(key, newApartment[key]);
            });
            createApartment(formData);
            nav('/apartments');
        }
        else {
            setErrors(newErrors);
        }
    }


    const changeCategory = (event) => {
        const categoryID = event.target.value;
        setNewApartment({ ...newApartment, categoryID: categoryID });
    }


    const changeCity = (event) => {
        const cityID = event.target.value;
        setNewApartment({ ...newApartment, cityID: cityID });
    }

//קריאת שרת בעת טעינת הקומפוננטה
    useEffect(() => {
        getAllCategories()
            .then(x => {
                dispatch(setCategories(x.categories));
            })
            .catch(err => {
                alert('קריאת שרת נכשלה');
            });

        getAllCities()
            .then(x => {
                dispatch(setCities(x.cites));
            })
            .catch(err => {
                alert('קריאת שרת נכשלה');
            });

        setNewApartment({ ...newApartment, advertiserID: currentUser._id });
    }, []);

    const categories = useSelector(x => x.categories);
    const cities = useSelector(x => x.cities);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        let error = '';

        if (id === 'beds') {
            const numericValue = Number(value);
            if (numericValue < 1 || numericValue > 1500) {
                error = 'מספר מיטות חייב להיות בין 1 ל-1500';
            }
        }

        if (id === 'price') {
            const numericValue = Number(value);
            if (numericValue < 1 || numericValue > 30000) {
                error = 'מחיר חייב להיות בין 1 ל-30000';
            }
        }

        setErrors({ ...errors, [id]: error });
        setNewApartment({ ...newApartment, [id]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewApartment({ ...newApartment, pic: file });
    };


                         //להוסיף דירה חדשה
    return (
        <>
            <div className="section">
                <div className="form">
                    <label htmlFor="nameApartment">שם הדירה:</label>
                    <input type="text" id="nameApartment" maxLength={15} name="nameApartment" onBlur={(e) => setNewApartment({ ...newApartment, nameApartment: e.target.value })} />
                    {errors.nameApartment && <span className="error" style={{ color: 'red' }}>{errors.nameApartment}</span>}

                    <label htmlFor="description">תאור:</label>
                    <input type="text" id="description" name="description" maxLength={99} onBlur={(e) => setNewApartment({ ...newApartment, description: e.target.value })} />

                    <label htmlFor="adress">כתובת:</label>
                    <input type="text" id="adress" name="adress" maxLength={45} onBlur={(e) => setNewApartment({ ...newApartment, adress: e.target.value })} />
                    {errors.adress && <span className="error" style={{ color: 'red' }}>{errors.adress}</span>}

                    <label htmlFor="beds">מס' מיטות:</label>
                    <input type="number" min="1" max="1500" id="beds" name="beds" onBlur={handleInputChange} />
                    {errors.beds && <span className="error" style={{ color: 'red' }}>{errors.beds}</span>}

                    <label htmlFor="additives">תוספות:</label>
                    <input type="text" id="additives" name="additives" maxLength={99} onBlur={(e) => setNewApartment({ ...newApartment, additives: e.target.value })} />

                    <label htmlFor="pic">תמונה:</label>
                    <input type="file" id="pic" name="pic" onChange={handleFileChange} />
                    {errors.pic && <span className="error" style={{ color: 'red' }}>{errors.pic}</span>}

                    <label htmlFor="price">מחיר:</label>
                    <input type="number" min="1" max="30000" id="price" name="price" onBlur={handleInputChange} />
                    {errors.price && <span className="error" style={{ color: 'red' }}>{errors.price}</span>}

                    <div>
                        <select onChange={changeCity} className="select-dropdown" defaultValue="">
                            <option value="" disabled>בחר עיר: </option>
                            {cities.map((city, index) => (
                                <option key={index} value={city._id}>
                                    {city.nameCity}</option>
                            ))}
                        </select>
                        {errors.cityID && <span className="error" style={{ color: 'red' }}>{errors.cityID}</span>}
                    </div>

                    <div>
                        <select onChange={changeCategory} className="select-dropdown" defaultValue="">
                            <option value="" disabled>בחר קטגוריה: </option>
                            {categories.map((category, index) => (
                                <option key={index} value={category._id}>
                                    {category.nameCategory}</option>
                            ))}
                        </select>
                        {errors.categoryID && <span className="error" style={{ color: 'red' }}>{errors.categoryID}</span>}
                    </div>

                    <button className="btn submit" onClick={handleSaveApartment} style={{ backgroundColor: "gray" }}>שמור דירה</button>
                </div>
            </div>
        </>
    );
};
