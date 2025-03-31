import React, { useState } from 'react';
import swal from "sweetalert";
import './LoginForm.css';
import { login } from './api';
import { data, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './Redux/Action';


const LoginForm = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const nav = useNavigate()
    const dispatch=useDispatch()

    const validatePassword = (password) => {
        if (password.length < 6) return 'סיסמה חייבת להכיל לפחות 6 תווים';
        if (!/[A-Z]/.test(password)) return 'סיסמה חייבת להכיל אות אנגלית גדולה';
        if (!/[a-z]/.test(password)) return 'סיסמה חייבת להכיל אות אנגלית קטנה';
        if (!/[0-9]/.test(password)) return 'סיסמה חייבת להכיל ספרה';
        return '';
    };

    const validate = (field, value) => {
        let errorMsg = '';
        if (!value) {
            errorMsg = 'שדה חובה'
        }
        else if (field === 'password') {
            errorMsg = validatePassword(value);
        }
        else if (field === 'email') {
            if (!/\S+@\S+\.\S+/.test(value))
                errorMsg = 'מייל לא תקין'
        }
        setErrors(prev => ({ ...prev, [field]: errorMsg }));
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
            default:
                break;
        }
    };

    const handleBlur = (e) => {
        const { id } = e.target;
        setTouchedFields(prev => ({ ...prev, [id]: true }));
        validate(id, e.target.value); // בדוק את השדה בעת שחרור
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        Object.keys(touchedFields).forEach(field => {
            validate(field, eval(field)); // בדוק את כל השדות בעת שליחה
        });

        if (errors.email === '' && errors.password === '') {
            const advertiser = { email: email, password: password }
            const data =await login(advertiser)
            
            if (data.advertiser) {
                localStorage.setItem('token', data.token); // Store token
                swal('!שלום', 'התחברת בהצלחה', 'success')
                dispatch(setCurrentUser(data.advertiser))
                nav('/apartments')
            }

         else if(data.status==404){
            
            swal(`שגיאה`, 'אינך מחובר למערכת', 'error')
            nav('/form')
        }
        else if(data.status==500){
            swal(`תקלה!`, 'השרתים שלנו תפוסים כעת נסה מאוחר יותר.', 'error');
        }
    }
    };


                               ////התחברות
    return (
        <form onSubmit={handleSubmit} className="login-form">


            {touchedFields.mobile && errors.mobile && <span className="error-text">{errors.mobile}</span>}

            <input
                type="password"
                id="password"
                placeholder="סיסמה"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.password && touchedFields.password ? 'error' : touchedFields.password ? 'success' : ''}`}
            />
            <input
                type="email"
                id="email"
                placeholder="מייל"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.email && touchedFields.email ? 'error' : touchedFields.email ? 'success' : ''}`}
            />
            {touchedFields.password && errors.password && <span className="error-text">{errors.email}</span>}

            <button type="submit" className="submit-button">התחברות</button>
        </form>
    );
};

export default LoginForm;
