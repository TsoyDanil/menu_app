import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import MenuPage from './containers/MenuPage/MenuPage';
import AddDishForm from './containers/AddDishForm/AddDishForm';
import EditDishForm from './containers/EditDishForm/EditDishForm';
import OrdersPage from './containers/OrdersPage/OrdersPage';
import { useAppDispatch } from './store/store';
import { getMenu } from './store/Menu/menu.slice';
import { getOrders } from './store/Order/order.slice';

const App: React.FunctionComponent = (): React.ReactElement => {
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(getMenu())
    dispatch(getOrders())
  },[])
  return (
    <div className="App">
      <Routes>
        <Route element={<Header/>}>
        <Route path='/' element={<MenuPage/>}/>
          <Route path='/add-form' element={<AddDishForm/>}/>
          <Route path='/orders' element={<OrdersPage/>}/>
          <Route path='/:key/edit' element={<EditDishForm/>}/>
          <Route path='*' element={<div><h1>Page not found</h1></div>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
