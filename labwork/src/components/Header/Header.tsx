import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './Header.css'

const Header: React.FunctionComponent = (): React.ReactElement => {
    return(
        <>
        <div className='Header'>
                <h1>Pizza</h1>
                <ul className='Header_Links'>
                    <li className={'NavigLink_styles'}>
                        <NavLink to={'/'}>Dishes</NavLink>
                    </li>
                    <li className={'NavigLink_styles'}>
                        <NavLink to={'/orders'}>Orders</NavLink>
                    </li>
                </ul>
        </div>
        <main>
            <Outlet/>
        </main>
        </>
    )
}

export default Header