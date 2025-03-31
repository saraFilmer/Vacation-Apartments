import { Outlet, useNavigate } from "react-router";
import ProductList from "./ProductList"
import { useDispatch } from "react-redux";
import { getAllApartments } from "./api";
import { setApartments } from "./Redux/Action";
import './Apartment.css';

export const Apartments = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    
    const cancelFilter = async () => {
        const app = await getAllApartments()
        dispatch(setApartments(app))
    };

    const navigate = useNavigate();
    const handleFilter = () => {
        navigate('filter');
    };

               //אפשרויות סינון
    return <>
        <Outlet></Outlet>
        <div className="btn-container">
            <button onClick={handleFilter} className="filter1">אפשריות סינון</button>
        </div>
        <ProductList></ProductList>
    </>
}