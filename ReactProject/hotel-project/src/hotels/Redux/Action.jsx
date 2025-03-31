//-----------משתמשים---------

export const setCurrentUser = (advertiser) => {
    return { type: 'SET_CURRENT_USER', payload: advertiser }
}

export const addUser = (advertiser) => {
    return { type: 'ADD_USER', payload: advertiser }
}


export const setApartments = (apartments) => {
    return { type: 'SET_APARTMENTS', payload: apartments }
}

export const setCategories = (categories) => {
    return { type: 'SET_CATEGORIES', payload: categories }
}

export const setCities = (cities) => {
    return { type: 'SET_CITIES', payload: cities }
}

export const addCityStore = (city) => {
    return { type: 'ADD_CITY', payload: city }
}

export const addCategoryStore = (category) => {
    return { type: 'ADD_CATEGORY', payload: category }
}

export const deleteApartment = (apartmentID) => {
    return { type: 'DEL_APARTMENT', payload: apartmentID }
}

export const addApartmentStore = (apartment) => {
    return { type: 'ADD_APARTMENT', payload: apartment }
}