
import { Apartments } from "./Apartments"
import { Home } from "./Home"
import { Route, Routes } from "react-router"
import LoginForm from "./LoginForm"
import RegistrationForm from "./RegistrationForm"
import ButtonsContainer from "./ButtonsContainer"
import MoreDetails from "./MoreDetails"
import AdvertiserDashboard from "./AdvertiserDashboard"
import UpdateApartment from "./UpdateApartment"
import { AddApartment } from "./AddApartment"

export const Routing = () => {
    return <>
        <Routes>
            <Route path="home" element={<Home></Home>}>
                <Route path="login" element={<LoginForm></LoginForm>}></Route>
            </Route>
            <Route path="form" element={<RegistrationForm></RegistrationForm>}></Route>
            <Route path="apartments" element={<Apartments></Apartments>}>
                <Route path="filter" element={<ButtonsContainer></ButtonsContainer>}></Route>
            </Route>
            <Route path="more_details/:_id" element={<MoreDetails></MoreDetails>} ></Route>
            <Route path="advertiser" element={<AdvertiserDashboard></AdvertiserDashboard>} ></Route>
            <Route path="update/:apID" element={<UpdateApartment></UpdateApartment>} ></Route>
            <Route path="add" element={<AddApartment></AddApartment>} ></Route>
            <Route path="" element={<Home></Home>}>
                <Route path="login" element={<LoginForm></LoginForm>}></Route>
            </Route>
        </Routes>
    </>
}