import React from 'react';
import bgimg from '../images/bglog.png'
import LoadingSpinner from './LoadingSpinner';
import BrandHeading from './BrandHeading';
import { useLocation, useNavigate } from 'react-router';
const ContentWrapper = ({success,loading,message,butttonRender}) => {

    /**navigate is used to navigate to page,location for the pathname */
    const navigate=useNavigate();
    const location=useLocation();
    return ( 
        
        
        
        <div className="relative w-full h-screen  bg-zinc-500/10">
                <img className="absolute w-full h-full object-cover mix-blend-overlay" src={bgimg} alt="/" />
            <div className=" flex justify-center items-center h-full">
                <div className="max-w-[400px] min-h-[500px] w-full mx-auto  bg-white p-8 rounded-xl z-0  ease-in-out duration-300">
                   {(success&&loading)  && <div className='mt-8 ease-in-out  duration-300'><LoadingSpinner/></div>}{/**only show the spiner if bouth statments are true */}

                    {/**only if the spinner has finished show the content,if this is showing durring login request the message will be empty*/}
                    {
                    (success&&!loading)&& 
                   <div className='mt-[120px] ml-4 mr-4 mb-8 items-center ease-in-out  duration-500'>
                   <BrandHeading title={message}></BrandHeading>
                            {
                                (butttonRender)&&
                                <button className='w-full py-2 mt-8  bg-black hover:bg-black/80 relative text-white rounded-xl'
                            onClick={()=>{
                                navigate('/')
                                if (location.pathname==='/') {
                                    navigate(0);/**this will refresh the page only if you try to login and that user is not found */
                                }

                               
                                
                                }}>Go Back To Login</button>
                            }
                   </div>
                    
                    }
                   
                   
                   
                   
                   
                   
                   
                    {/* <div className='mt-[100px] ml-4 mr-4 mb-8 items-center ease-in-out  duration-500'>
                        
                    </div> */}
                            
                </div>
            </div>
        </div>                    
     );
}
 
export default ContentWrapper;