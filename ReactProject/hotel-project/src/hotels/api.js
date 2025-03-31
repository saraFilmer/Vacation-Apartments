import axios from "axios"
import swal from "sweetalert";

const baseUrl = `http://localhost:3001`

export const addAdvertiser = (advertiser) => {
    console.log(advertiser);

    return axios.post(`${baseUrl}/advertiser/register`, advertiser)
        .then(res => {return res.data})
        .catch(err => {return err
         })
        }


export const login = (advertiser) => {

    return axios.post(`${baseUrl}/advertiser/login`, advertiser)
        .then(res => {return res.data})
        .catch(error =>{return error})
    }


export const getAllApartments = () => {

    return axios.get(`${baseUrl}/apartment`)
        .then(res => res.data)
        .catch(error => swal(`Error`, '!', 'error'))
    }


export const getAllCities = () => {

    return axios.get(`${baseUrl}/city`)
        .then(res => res.data)
        .catch(error => swal(`Error`, '! ! !', 'error'))
        }


export const getAllCategories = () => {

    return axios.get(`${baseUrl}/category`)
        .then(res => res.data)
        .catch(error => swal(`Error`, '!', 'error'))
        }


export const getApartmentByCity = (id) => {

    return axios.get(`${baseUrl}/apartment/getbycity/${id}`)
        .then(res => (res.data.city[0].apartments))
        .catch(err => err.message)
    }


export const getApartmentByCategory = (id) => {

    return axios.get(`${baseUrl}/apartment/getbycategory/${id}`)
        .then(res => (res.data.category[0].apartments))
        .catch(err => err.message)
    }


export const getApartmentByID = (id) => {
    const token = localStorage.getItem("token")

    return axios.get(`${baseUrl}/apartment/getbyid/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}` }
        })
        .then(res => (res.data))
        .catch(err => err.message)
    }


export const getApartmentByBed = (small, big) => {

    return axios.get(`${baseUrl}/apartment/getbybeds/${small}/${big}`)
        .then(res => (res.data.apartments))
        .catch(err => err.message)
    }


export const getApartmentByPrice = (small, big) => {

    return axios.get(`${baseUrl}/apartment/getbyprice/${small}/${big}`)
        .then(res => (res.data.apartments))
        .catch(err => err.message)
    }


export const getMyApartments = (id) => {
    const token = localStorage.getItem("token")

    return axios.get(`${baseUrl}/apartment/getbyadvertiser/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}` }
        })

        .then(res => (res.data.advertiser[0].apartments))
        .catch(err => (err.message, console.log(err.message)))
    }


export const addCity = (city) => {
    const token = localStorage.getItem("token")

    return axios.post(`${baseUrl}/city`, city,
        {
            headers: {
                Authorization: `Bearer ${token}` }
        })
        .then(res => res.data)
        .catch(err => err.message)
    }


export const addCategory = (category) => {
    const token = localStorage.getItem("token")

    return axios.post(`${baseUrl}/category`, category,
        {
            headers: {
                Authorization: `Bearer ${token}` }
        })
        .then(res => res.data)
        .catch(err => err.message)
    }


export const delApartment = (apartmentID, advertiserID) => {
    const token = localStorage.getItem("token")

    return axios.delete(`${baseUrl}/apartment/${apartmentID}/${advertiserID}`,
        {
            headers: {
                Authorization: `Bearer ${token}`}
        }
    )
        .then(res => res)
        .catch(err => {
            console.log(err);
            if (err.status == 403)
                swal("...אופס", "!!אינך יכול למחוק דירה שאינה שייכת לך", "error")
        })
    }


export const createApartment = (apartment) => {
    const token = localStorage.getItem("token")

    return axios.post(`${baseUrl}/apartment`, apartment,
        {
            headers: {
                Authorization: `Bearer ${token}` }
        })
        .then(res => res.data)
        .catch(err => {
            console.log(err);
            // if(err.status==403)
            //     swal("...אופס","!!אינך יכול למחוק דירה שאינה שייכת לך","error")
        })
    }


export const updateApartment = (apartment, apartmentID, advertiserID) => {
    const token = localStorage.getItem("token")

    return axios.patch(`${baseUrl}/apartment/${apartmentID}/${advertiserID}`, apartment,
        {
            headers: {
                Authorization: `Bearer ${token}`  }
        })
        .then(res => res.data)
        .catch(err => {
            console.log(err);
            if (err.status == 403)
                swal("...אופס", "!!אינך יכול לעדכן דירה שאינה שייכת לך", "error") })
            }