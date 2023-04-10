import logo from './logo.svg';
import './App.css';
import {Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom'
import Layout from '../src/components/Layout/Layout'
import Login from '../src/components/Login/Login'
import Register from '../src/components/Register/Register'
import Home from '../src/components/Home/Home'
import All from '../src/components/All/All'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import jwtDecode from 'jwt-decode';
import ItemDetails from './components/ItemDetails/ItemDetails';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './components/store/store';
import Platform from './components/Platform/Platform';
import Category from './components/Category/Category';
import SortBy from './components/SortBy/SortBy';
import Error from './components/Error/Error';
import { Offline } from 'react-detect-offline';

function App() {

  const [userData,setUserData]= useState('');
  useEffect(()=>{
    if (localStorage.getItem('userData')!==null) {
      saveUserData()
    }
  },[])

  function saveUserData(){
    let deCoded=jwtDecode(localStorage.getItem('userData'));
    setUserData(deCoded);
  }
  
let router = createBrowserRouter([{
  path:'/',element:<Layout setUserData={setUserData} userData={userData}/>,children:[
    {path:'register',element:<Register/>},
    {path:'*',element:<Error/>},
    {path:'login',element:<Login saveUserData={saveUserData}/> },
    {path:'all',element: <ProtectedRoute userData={userData}><All/></ProtectedRoute>},
    {path:'platform/:type',element: <ProtectedRoute userData={userData}><Platform/></ProtectedRoute>},
    {path:'category/:type',element: <ProtectedRoute userData={userData}><Category/></ProtectedRoute>},
    {path:'sort-by/:type',element: <ProtectedRoute userData={userData}><SortBy/></ProtectedRoute>},
    {path:'itemDetails/:id',element: <ProtectedRoute userData={userData}><ItemDetails/></ProtectedRoute>},
    {path:'/',element: <ProtectedRoute userData={userData}><Home/></ProtectedRoute>}
  ]
}])

  return <>
  <Offline> <div className="alert alert-danger offline p-3 position-fixed bottom-0 m-4 end-0 "><span className='fs-2 text-black'> Connection isn't stable </span></div> </Offline>
  <Provider store={store}> <RouterProvider router={router}/></Provider>
 
  </>
}

export default App;
