import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import MenuPage from './containers/MenuPage/MenuPage';
import AddDishForm from './containers/AddDishForm/AddDishForm';
import EditDishForm from './containers/EditDishForm/EditDishForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Header/>}>
        <Route path='/' element={<MenuPage/>}/>
          <Route path='/add-form' element={<AddDishForm/>}/>
          <Route path='/orders' element={<div>Orders</div>}/>
          <Route path='/:key/edit' element={<EditDishForm/>}/>
          <Route path='*' element={<div><h1>Page not found</h1></div>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
