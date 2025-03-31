import { NavLink } from "react-router-dom";
import './Nav.css';
import { useSelector } from "react-redux";
import { FaUser } from 'react-icons/fa';

export const Nav = () => {
    const currentUser = useSelector(x => x.currentUser);
    return (
        <div className="nav">
            <div className="logo">
                        {/* <img src={`${process.env.PUBLIC_URL}/logo-removebg-preview (1).png`} alt="Site Logo" className="site-logo" /> */}
                    </div>
                    {/* מציג בצד מייל אם מפרסם מחובר */}
            {currentUser.email && (
                <div className="user-info">
                    <FaUser className="user-icon" />
                    <h1 className="title">{currentUser.email}</h1>
                </div>
            )}
            <NavLink to="/home" className="link" >דף הבית</NavLink>
            <NavLink to="/apartments" className="link" >דירות</NavLink>
            <NavLink to="/form" className="link">הרשמה</NavLink>

            {currentUser.email && <NavLink to="/advertiser" className="link" activeClassName="active">ממשק מפרסם</NavLink>}
        </div>
    );
};
