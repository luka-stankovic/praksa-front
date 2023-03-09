import React from 'react';
import {useState} from 'react';
import bgimg from '../images/bglog.png'
import BrandHeading from '../components/BrandHeading';
import { validPassword } from '../service/Regex';
import { useParams } from 'react-router'
import { resetPassword } from '../service/userApi';
import ContentWrapper from '../components/ContentWrapper';
const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [pwdConfError, setPwdConfError] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const [PasswordMatchErr, setPasswordMatchErr] = useState(false);
    const [success,setSuccess]=useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ButtonRender, setButtonRender] = useState(false);

    const [message, setMessage] = useState("");

    const {token} = useParams();

     /**function that is called from the onClick event from the button in the form to hanndle our reset password request */
    const hanndleSubmit=async(e)=>
    {
        setMessage("");
        /**if password and confrim password are invalid,based on the Regex service, set the error state to true to show the error messages */
        if (!(validPassword.test(password) && validPassword.test(passwordConf))) {
            setPwdError(true);
            setPwdConfError(true);
        }
        /**if the password and confirm password do not match set the error state to true to show the error message */
        if (!(password===passwordConf)) {
            setPasswordMatchErr(true);
            
        }
       /**if the password and confirm password are valid and they match procead with the reset */
         if((password===passwordConf) && (validPassword.test(password) && validPassword.test(passwordConf)))
        {   

            setPasswordMatchErr(false)
            console.log("TOKEN " + token);
           
            let reset = {token, password};
            /**resetPassword from userApi.js,sending the reset request*/
            resetPassword(reset)
            .then(res =>{
                setButtonRender(false);
                setIsLoading(true);
                 /**set isLoding to true so the Loading spinner can show up */
                 /**the timeout is here just to set a delay so the spiner can be shown better */
                 /**ButtonRender is used to condidionaly render Go Back button while the request is active */
                    setTimeout(() => {
                        setMessage(res);
                        /**isLoding is set to false for the spinner to stop showing */
                        setIsLoading(false);
                        setButtonRender(true);
                    }, 500);
                })
                /**catch any errors */
            .catch(err => {
                setIsLoading(true)
                setTimeout(() => {
                    setMessage(err.response.data.message);
                    setIsLoading(false);
                    setButtonRender(true);
                }, 500);
            });
            console.log(message);
            /**initially success is set to false so the form can be shown and send the request ,after that is set to true so the response can be shown*/
            setSuccess(true);
            setPassword('');
            setPasswordConf('');
        }
    }


    return ( 
        <>
        
           {
            success? (isLoading?(
                // if the reset is succesfull and the loading spinner is true show the spinner
                <ContentWrapper success={success} loading={isLoading} butttonRender={ButtonRender} />

            ):(
                // {/*if reset is succesfull and loading spiner has done executing show the sucsessful status and a button to the user to go back to the login */ }
                <ContentWrapper success={success} loading={isLoading} message={message} butttonRender={ButtonRender} />
            )
                
            ):(
                
                    // the default content when user wants to reset their password
                <div className="relative w-full h-screen  bg-zinc-500/10">
                <img className="absolute w-full h-full object-cover mix-blend-overlay" src={bgimg} alt="/" />
                    <div className=" flex justify-center items-center h-full">
        
                        <form className="max-w-[400px] w-full mx-auto  bg-white p-8 rounded-xl z-0 " onSubmit={hanndleSubmit}>
                            <BrandHeading title={"Set your new password"}></BrandHeading>
                            <div className=" flex flex-col mb-4">
                                <label className="text-black p-2" >Password:</label>
                                <input className="border relative bg-gray-100 p-2 rounded-lg" type="password"
                                    placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} required/>
    
                            </div>
                            <div className=" flex flex-col mb-4">
                                
                                <label className="text-black p-2" >Confirm Password:</label>
                                    <input className="border relative bg-gray-100 p-2 rounded-lg" type="password"
                                    placeholder='Confirm Password' value={passwordConf} onChange={(e)=> setPasswordConf(e.target.value)} required/>
                            </div>
                            
                                    <button className='w-full py-3 mt-8  bg-black hover:bg-black/90 relative text-white rounded-xl  disabled:bg-gray-500'
                                        disabled={password===''} type="submit"  >Confirm</button>

                                                        {/**conditional rendering div error messages */}
                            { pwdError&&pwdConfError&&<div className="border relative border-none bg-red-400/90 p-2 rounded-lg text-center text-black mt-4 text-lg">
                            Bouth input fileds must have at least 5 characters</div>  }
                            { PasswordMatchErr&&<div className="border relative border-none bg-red-400/90 p-2 rounded-lg text-center text-black mt-4 text-lg">
                            Password does not match </div>  }

                        </form>
                 </div>
        </div>
                
            )
           }        
        </>
     );
}
 
export default ResetPassword;