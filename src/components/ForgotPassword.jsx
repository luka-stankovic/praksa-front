import React from 'react';
import { Link } from 'react-router-dom';
export default function ForgotPassword()
{
    return(
      <div className='text-center text-lg mt-8  '>
      <br />
      <Link to="/forgotpassword" className='text-black'>Forgot Password?</Link>
      </div>
    )
}