// import React, { useEffect, useState } from 'react';
// import './styles.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { addCategoryStore, addCityStore, deleteApartment, setApartments, setCategories, setCities } from './Redux/Action';
// import { useNavigate } from 'react-router';
// import { addCategory, addCity, delApartment, getAllApartments, getAllCategories, getAllCities } from './api';
// import { Apartments } from './Apartments';
// const AdvertiserDashboard = () => {
//     //שליםת המערכים מהסטור
//     const cities1 = useSelector(x => x.cities)
//     const categories1 = useSelector(x => x.categories)
//     const apartments1 = useSelector(x => x.apartments)
//     const currentUser=useSelector(x=>x.currentUser)
    
    
//     //משתנים
//     const [showCities, setShowCities] = useState(false);
//     const [showCategories, setShowCategories] = useState(false);
//     const [showApartments, setShowApartments] = useState(false);
//     const [newCity, setNewCity] = useState(null);
//     const [newCategory, setNewCategory] = useState(null);
//     const [cities2, setCities2] = useState(cities1)
//     const [categories2, setCategories2] = useState(categories1)
//     const [apartments2, setApartments2] = useState(apartments1)

//     const nav = useNavigate();
//     const dispatch = useDispatch();

//     const upApartment = (event) => {
//          const apID = event.target.getAttribute('id');
//         nav(`/update/${apID}`);
//     };

//     const addApartment = () => {
//         nav(`/add`);
//     };

//     const addCitySubmit = () => {

//         addCity(newCity)
//         dispatch(addCityStore(newCity))
//         setShowCities(!showCities);
//     };

//     const addCategorySubmit = () => {
//         addCategory(newCategory)//לשרת
//         dispatch(addCategoryStore(newCategory))//לסטור
//         setShowCategories(!showCategories);
//     };



//     const handleDeleteApartment = (apartmentID) => {

//         delApartment(apartmentID,currentUser._id)
//         dispatch(deleteApartment(apartmentID));
//     };

//     useEffect(() => {//קריאת שרת בעת טעינת הקומפוננטה
//         getAllCities()
//             .then(x => {
//                 console.log(x.cites);
                
//                 dispatch(setCities(x.cites))
//             })
//             .catch(err => {
//                 console.log('קריאת שרת נכשלה')
//             })

//         getAllCategories()
//             .then(x => {
//                 console.log(x.categories);

//                 dispatch(setCategories(x.categories))
//             })
//             .catch(err => {
//                 console.log('קריאת שרת נכשלה')
//             })

//         getAllApartments()
//             .then(x => {
//                 dispatch(setApartments(x))
//             })
//             .catch(err => {
//                 console.log('קריאת שרת נכשלה')
//             })


//     }, [])


//     return (
//         <div className="container">
//             <h1>ממשק מפרסם </h1>
//             {/* תצוגת ערים והוספת עיר */}
//             <button className="btn" id='show' onClick={() => setShowCities(!showCities)}>
//                 {showCities ? 'סגור תצוגת ערים' : 'הצגת כל הערים'}
//             </button>
//             {showCities && cities2.map((city) => (
//                 <div className="section" key={city._id}>
//                     <label> שם העיר: {city.nameCity}</label><br />
//                 </div>
//             ))}
//             {showCities && (
//                 <div className="section">
//                     <h1>הוספת עיר</h1>
//                     <div className="form">
//                         <label htmlFor="company">שם העיר:</label>
//                         <input type="text" id="nameCity" name="nameCity" onBlur={(e) => setNewCity({ ...newCity, nameCity: e.target.value })} />
//                         <button className="btn submit" onClick={addCitySubmit} style={{ backgroundColor: 'grey' }}>שמור עיר</button>
//                     </div>
//                 </div>
//             )}
//             {/* תצוגת קטגוריות והוספת קטגוריה */}
//             <button className="btn" id='show' onClick={() => setShowCategories(!showCategories)}>
//                 {showCategories ? 'סגור תצוגת קטגוריות' : 'הצגת כל הקטגוריות'}
//             </button>
//             {showCategories && categories2.map((category) => (
//                 <div className="section" key={category._id}>
//                     <label> שם הקטגוריה: {category.nameCategory}</label><br />
//                 </div>
//             ))}
//             {showCategories && (
//                 <div className="section">
//                     <h1>הוספת קטגוריה</h1>
//                     <div className="form">
//                         <label htmlFor="company">שם הקטגוריה:</label>
//                         <input type="text" id="nameCategory" name="nameCategory" onBlur={(e) => setNewCategory({ ...newCategory, nameCategory: e.target.value })} />
//                         <button className="btn submit" onClick={addCategorySubmit} style={{ backgroundColor: 'grey' }}>שמור קטגוריה</button>
//                     </div>
//                 </div>
//             )}


//             <button className="btn" id='show' onClick={() => setShowApartments(!showApartments)}>
//                 {showApartments ? 'סגור תצוגת דירות' : 'הצגת הדירות'}
//             </button>
//             {showApartments && apartments2.map((apartment) => (
//                 <div key={apartment._id} className="car-item">
//                     <h2 className="product_name">{apartment.nameApartment}</h2>
//                     <p><span className="product_label">תאור:</span> {apartment.description}</p>
//                     <p><span className="product_label">קטגוריה:</span> {apartment.categoryID.nameCategory}</p>
//                     <p><span className="product_label">עיר:</span> {apartment.cityID.nameCity}</p>
//                     <p><span className="product_label">כתובת:</span> {apartment.adress}</p>
//                     <p><span className="product_label">מס' מיטות:</span> {apartment.beds}</p>
//                     <p><span className="product_label">תוספות:</span> {apartment.additives}</p>
//                     <p><span className="product_label">מחיר:</span> {apartment.price}</p>
//                     <p><span className="product_label">מייל בעל הדירה:</span> {apartment.advertiserID.email}</p>
//                     <p><span className="product_label">טלפון בעל הדירה:</span> {apartment.advertiserID.phone}</p>
//                     <p><span className="product_label">טלפון נוסף בעל הדירה:</span> {apartment.advertiserID.otherPhone}</p>
//                     <div className="car-actions">
//                         <button className="btn up" onClick={upApartment} id={apartment._id}>
//                             עדכון דירה
//                         </button>
//                         <button className="btn delete" onClick={() => handleDeleteApartment(apartment._id)}>
//                             🗑️
//                         </button>
//                         <button className="btn edit" onClick={addApartment}>
//                             ➕
//                         </button>
//                     </div>
//                 </div>
//             ))}




//         </div>
//     );
// };

// export default AdvertiserDashboard;



import React, { useEffect, useState } from 'react';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryStore, addCityStore, deleteApartment, setApartments, setCategories, setCities } from './Redux/Action';
import { useNavigate } from 'react-router';
import { addCategory, addCity, delApartment, getAllApartments, getAllCategories, getAllCities } from './api';
import { Apartments } from './Apartments';

const AdvertiserDashboard = () => {
    //שליפת המערכים מהסטור
    const cities1 = useSelector(x => x.cities)
    const categories1 = useSelector(x => x.categories)
    const apartments1 = useSelector(x => x.apartments)
    const currentUser=useSelector(x=>x.currentUser)
    
    //משתנים
    const [showCities, setShowCities] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [showApartments, setShowApartments] = useState(false);
    const [newCity, setNewCity] = useState(null);
    const [newCategory, setNewCategory] = useState(null);
    const [cities2, setCities2] = useState(cities1)
    const [categories2, setCategories2] = useState(categories1)
    const [apartments2, setApartments2] = useState(apartments1)
    const nav = useNavigate();
    const dispatch = useDispatch();

    const upApartment = (event) => {
         const apID = event.target.getAttribute('id');
        nav(`/update/${apID}`);
    };

    const addApartment = () => {
        nav(`/add`);
    };

    const addCitySubmit = () => {

        addCity(newCity)
        dispatch(addCityStore(newCity))
        setShowCities(!showCities);
    };

    const addCategorySubmit = () => {
        addCategory(newCategory)//לשרת
        dispatch(addCategoryStore(newCategory))//לסטור
        setShowCategories(!showCategories);
    };



    const handleDeleteApartment = (apartmentID) => {
        delApartment(apartmentID,currentUser._id)
        dispatch(deleteApartment(apartmentID));
    };

    //קריאת שרת בעת טעינת הקומפוננטה
    useEffect(() => {
        getAllCities()
            .then(x => {
                console.log(x.cites);
                dispatch(setCities(x.cites));
                setCities2(x.cites); // עדכון cities2 עם הנתונים החדשים
            })
            .catch(err => {
                console.log('קריאת שרת נכשלה');
            });
    
        getAllCategories()
            .then(x => {
                console.log(x.categories);
                dispatch(setCategories(x.categories));
                setCategories2(x.categories); // עדכון categories2 עם הנתונים החדשים
            })
            .catch(err => {
                console.log('קריאת שרת נכשלה');
            });
    
        getAllApartments()
            .then(x => {
                dispatch(setApartments(x));
            })
            .catch(err => {
                console.log('קריאת שרת נכשלה');
            });
    }, []);
    
                                      //ממשק מפרסם
    return (
        <div className="container">
            <h1>ממשק מפרסם </h1>
            {/* תצוגת ערים והוספת עיר */}
            <button className="btn" id='show' onClick={() => setShowCities(!showCities)}>
                {showCities ? 'סגור תצוגת ערים' : 'הצגת כל הערים'}
            </button>
            {showCities && cities2.map((city) => (
                <div className="sections" key={city._id}>
                    <label> שם העיר: {city.nameCity}</label><br />
                </div>
            ))}
            {showCities && (
                <div className="plus">
                    <h1>הוספת עיר</h1>
                    <div className="form">
                        <label htmlFor="company">שם העיר:</label>
                        <input type="text" id="nameCity" name="nameCity" onBlur={(e) => setNewCity({ ...newCity, nameCity: e.target.value })} />
                        <button className="btn submit" onClick={addCitySubmit} style={{ backgroundColor: 'grey' }}>שמור עיר</button>
                    </div>
                </div>
            )}
            {/* תצוגת קטגוריות והוספת קטגוריה */}
            <button className="btn" id='show' onClick={() => setShowCategories(!showCategories)}>
                {showCategories ? 'סגור תצוגת קטגוריות' : 'הצגת כל הקטגוריות'}
            </button>
            {showCategories && categories2.map((category) => (
                <div className="sections" key={category._id}>
                    <label> שם הקטגוריה: {category.nameCategory}</label><br />
                </div>
            ))}
            {showCategories && (
                <div className="plus">
                    <h1>הוספת קטגוריה</h1>
                    <div className="form">
                        <label htmlFor="company">שם הקטגוריה:</label>
                        <input type="text" id="nameCategory" name="nameCategory" onBlur={(e) => setNewCategory({ ...newCategory, nameCategory: e.target.value })} />
                        <button className="btn submit" onClick={addCategorySubmit} style={{ backgroundColor: 'grey' }}>שמור קטגוריה</button>
                    </div>
                </div>
            )}



            <button className="btn" id='show' onClick={() => setShowApartments(!showApartments)}>
                {showApartments ? 'סגור תצוגת דירות' : 'הצגת הדירות'}
            </button>
            {showApartments && apartments2.map((apartment) => (
                <div key={apartment._id} className="car-item">
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
                    <div className="car-actions">
                        <button className="btn up" onClick={upApartment} id={apartment._id}>
                            עדכון דירה
                        </button>
                        <button className="btn delete" onClick={() => handleDeleteApartment(apartment._id)}>
                            🗑️
                        </button>
                        <button className="btn edit" onClick={addApartment}>
                            ➕
                        </button>
                    </div>
                </div>
            ))}




        </div>
    );
};

export default AdvertiserDashboard;
