import React from "react";
import LogInForm from "./LoginForm";

import bgimg from '../images/bglog.png'

export default function LogIn()
{   
    
    return(
        <div className="relative w-full h-screen  bg-zinc-500/10">
            
           
            <img className="absolute w-full h-full object-cover mix-blend-overlay" src={bgimg} alt="/" />
            <LogInForm/>
        </div>

    )
}