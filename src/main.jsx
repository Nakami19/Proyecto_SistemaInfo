import React from 'react'
import ReactDOM from 'react-dom/client'
import { HomePage } from './Pages/HomePage/HomePage'
import './index.css'
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Layout from './Components/Layout/Layout';
import { ARTDETAIL_URL, HOME_URL, LOGIN_URL, PROFILE_URL, REGISTER_URL, TOURS_URL } from './constants/url';
import { ToursPage } from './Pages/ToursPage/ToursPage';
import { ArtDetailsPage } from './Pages/ArtDetailsPage/ArtDetailsPage';
import { SignupPage } from './Pages/SignupPage/SignupPage'
import { LoginPage } from './Pages/LoginPage/LoginPage'
import { ProfilePage } from './Pages/ProfilePage/ProfilePage'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter> 
    <Routes>
    <Route element={<Layout/>}>
        <Route path={HOME_URL} element={<HomePage/>}/> 
        <Route path={TOURS_URL} element={<ToursPage/>}/>
        <Route path={ARTDETAIL_URL} element={<ArtDetailsPage/>}/>
        <Route path={LOGIN_URL} element={<LoginPage/>}/>
        <Route path={REGISTER_URL} element={<SignupPage/>}/>
        <Route path={PROFILE_URL} element={<ProfilePage/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,

)
