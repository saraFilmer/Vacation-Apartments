import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routing } from './Routing'
import { Nav } from './Nav'
import { Home } from './Home'
import { Provider } from 'react-redux'
import myStore from './Redux/Store'

export const Main = () => {
    return <>
        <Provider store={myStore}>
            <BrowserRouter>
            <Nav></Nav>
                <Routing></Routing>
                
            </BrowserRouter>
        </Provider>

    </>
}