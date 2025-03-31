import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { getAllCategories, getApartmentByID, updateApartment } from './api';
import { setCategories } from './Redux/Action';

const UpdateApartment = () => {
    const { apID } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newApartment, setNewApartment] = useState(null);
    const [formData, setFormData] = useState({
        description: '',
        beds: '',
        additives: '',
        price: '',
        categoryID: ''
    });
    const [errors, setErrors] = useState({});
    const categories = useSelector(x => x.categories);
    const currentUser = useSelector(x => x.currentUser);

    //קריאת שרת בעת טעינת הקומפוננטה
    useEffect(() => {
        const fetchData = async () => {    
            try {
                const categoriesResponse = await getAllCategories();
                dispatch(setCategories(categoriesResponse.categories));
            } catch (err) {
                alert('קריאת שרת נכשלה');
            }
    
            const app = await getApartmentByID(apID);
            if (app) {
                setNewApartment(app);
                setFormData({
                    description: app.description,
                    beds: app.beds,
                    additives: app.additives,
                    price: app.price,
                    categoryID: app.categoryID._id
                });
            }
        };
    
        fetchData();
    }, [apID, dispatch]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const changeCategory = (event) => {
        const categoryID = event.target.value;
        setFormData({ ...formData, categoryID: categoryID });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        // בדיקות שדות ריקים
        if (!formData.price) newErrors.price = 'שדה מחיר הוא חובה';
        if (!formData.beds) newErrors.beds = 'שדה מיטות הוא חובה';
        if (!formData.categoryID) newErrors.categoryID = 'יש לבחור קטגוריה';

        // בדיקות טווחים
        if (formData.beds < 1 || formData.beds > 1500) {
            newErrors.beds = 'מספר מיטות חייב להיות בין 1 ל-1500';
        }
        if (formData.price < 1 || formData.price > 30000) {
            newErrors.price = 'מחיר חייב להיות בין 1 ל-30000';
        }

        // אם יש שגיאות, הצג אותן
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const app = {
            ...formData
        };
    
        console.log("Sending data:", app);
        console.log("Apartment ID:", apID);
        console.log("Advertiser ID:", currentUser._id);
    
        // קריאת שרת
        updateApartment(app, apID, currentUser._id)
            .then(response => {
                console.log("Response:", response);
                navigate('/apartments');
            })
            .catch(error => {
                console.error("Error updating apartment:", error);
            });
    };
    
    return (
        <div className="container">
            <h1>Update Apartment Details</h1>
            <form onSubmit={handleSubmit} className="form">
                <label htmlFor="description">תאור:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <label htmlFor="beds">מיטות:</label>
                <input
                    type="number"
                    id="beds"
                    name="beds"
                    value={formData.beds}
                    onChange={handleChange}
                />
                {errors.beds && <span className="error" style={{ color: 'red' }}>{errors.beds}</span>}
                
                <label htmlFor="additives">תוספות:</label>
                <input
                    type="text"
                    id="additives"
                    name="additives"
                    value={formData.additives}
                    onChange={handleChange}
                />
                <label htmlFor="price">מחיר:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
                {errors.price && <span className="error" style={{ color: 'red' }}>{errors.price}</span>}
                
                <div>
                    <select onChange={changeCategory} className="select-dropdown" defaultValue="">
                        <option value="" disabled>בחר קטגוריה: </option>
                        {categories.map((category, index) => (
                            <option key={index} value={category._id}>
                                {category.nameCategory} </option>
                        ))}
                    </select>
                    {errors.categoryID && <span className="error" style={{ color: 'red' }}>{errors.categoryID}</span>}
                </div>
                <button type="submit" className="btn submit" style={{ backgroundColor: "#b30000" }}>לאישור</button>
            </form>
        </div>
    );
};

export default UpdateApartment;
