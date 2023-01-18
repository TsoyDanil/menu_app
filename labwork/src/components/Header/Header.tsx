import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './Header.css'

const Header: React.FunctionComponent = (): React.ReactElement => {
    return(
        <>
        <div className='Header'>
            <p>Pizza</p>
            <div className='Header_Links'>
                <NavLink to={'/'}>Dishes</NavLink>
                <NavLink to={'/orders'}>Orders</NavLink>
            </div>
        </div>
        <main>
            <Outlet/>
        </main>
        </>
    )
}

export default Header