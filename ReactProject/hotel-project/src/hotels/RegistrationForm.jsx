import React, { useState } from 'react';
import './RegistrationForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import swal from "sweetalert";
import { addUser, setCurrentUser } from './Redux/Action';
import { addAdvertiser } from './api';

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [OtherPhone, setOtherPhone] = useState('');

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const nav = useNavigate();

    const validate = (field, value) => {
        const newErrors = { ...errors };

        switch (field) {

            case 'email':
                if (!value) {
                    newErrors.email = 'שדה חובה';
                } else if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                    newErrors.email = 'מייל לא תקין';
                } else {
                    delete newErrors.email;
                }
                break;
            case 'password':
                if (!value) {
                    newErrors.password = 'שדה חובה';
                } else if (value.length < 6 || !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
                    newErrors.password = 'סיסמה חייבת להכיל לפחות 6 תווים, לפחות אות אנגלית גדולה אחת ואות אנגלית קטנה אחת';
                } else {
                    delete newErrors.password;
                }
                break;
            case 'phone':
                if (!value) {
                    newErrors.phone = 'שדה חובה'
                }
                else if (!/^\d{10}$/.test(value)) {
                    newErrors.phone = 'מספר הטלפון חייב לכלול 10 ספרות';
                } else {
                    delete newErrors.phone;
                }
                break;
            case 'OtherPhone':
                if (!/^\d{10}$/.test(value)) {
                    newErrors.OthertPhone = 'מספר הטלפון חייב לכלול 10 ספרות ';
                } else {
                    delete newErrors.OthertPhone;
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        switch (id) {

            case 'email':
                setEmail(value);
                validate('email', value);
                break;
            case 'password':
                setPassword(value);
                validate('password', value);
                break;
            case 'phone':
                setPhone(value);
                validate('phone', value);
                break;
            case 'OtherPhone':
                setOtherPhone(value);
                //    validate('OtherPhone', value);
                break;
            default:
                break;
        }};


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0 && phone && password && email) {
            const advertiser = {
                phone: phone,
                password: password,
                otherPhone: OtherPhone,
                email: email
            };
            const data = await addAdvertiser(advertiser)
            if (data.advertiser) {
                dispatch(setCurrentUser(data.advertiser));
                localStorage.setItem('token', data.token)
                swal(`!שלום`, '!!התחברת בהצלחה', 'success');
                nav('/apartments');
            }
            else if (data.status == 400)
                swal(`אופס!`, 'מייל זה כבר קיים במערכת!', 'error');
            else if (data.status == 500)
                swal(`תקלה!`, 'השרתים שלנו תפוסים כעת נסה מאוחר יותר.', 'error');
            }};


    const restart = () => {
        setEmail('')
        setPassword('')
        setPhone('')
        setOtherPhone('')
    }
 
    ///////////////מי שלא רשום כאן נרשמים
    return (
        <form onSubmit={handleSubmit} className="registration-form">
            <input type="email" id="email" placeholder="מייל" value={email} onChange={handleChange} />
            {errors.email && <span className="error-text">{errors.email}</span>}

            <input type="password" id="password" placeholder="סיסמה" value={password} onChange={handleChange} />
            {errors.password && <span className="error-text">{errors.password}</span>}

            <input type="text" id="phone" placeholder="טלפון" value={phone} onChange={handleChange} />
            {errors.phone && <span className="error-text">{errors.phone}</span>}

            <input type="text" id="OtherPhone" placeholder="טלפון נוסף" value={OtherPhone} onChange={handleChange} />
            {errors.OtherPhone && <span className="error-text">{errors.OtherPhone}</span>}
            <button className="submit-button" onClick={restart}>לאיפוס הטופס</button>
            <button type="submit" className="submit-button">להרשמה</button>
        </form>
    );
};

export default RegistrationForm;
