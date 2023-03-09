import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import NF from './pages/NF';
import Onboarding from './pages/Onboardings';
import Profile from './pages/Profile';
import Templates from './pages/Templates';
import UPS from './pages/UPS';
import Users from './pages/Users';
import ForgotPasswordForm from './pages/ForgotPasswordForm';
import ResetPassword from './pages/ResetPassword';

function RoutesCont() {
  return (
    <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/nf' element={<NF />}></Route>
        <Route path='/onboarding/:id' element={<Onboarding />}></Route>
        <Route path='/profile/:id' element={<Profile />}></Route>
        <Route path='/templates' element={<Templates />}></Route>
        <Route path='/ups' element={<UPS />}></Route>
        <Route path='/users' element={<Users />}></Route>
        <Route path='/forgotpassword' element={<ForgotPasswordForm/>}></Route>
        <Route path='/reset/:token' element={<ResetPassword/>}></Route>
        <Route path='*' element={<NF />}></Route>
    </Routes>
  )
}

export default RoutesCont