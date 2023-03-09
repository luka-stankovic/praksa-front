import React, {useState, useContext} from "react";
import BrandHeading from "./BrandHeading";
import ForgotPassword from "./ForgotPassword";
import { validEmail,validPassword } from "../service/Regex";
import {loginUser} from "../service/userApi";
import {userContext} from "../App"
import ContentWrapper from "./ContentWrapper";

export default function LogInForm()
{       
   
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const [success,setSuccess]=useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [ButtonRender, setButtonRender] = useState(false);
    const {setUserToken} = useContext(userContext);

  const hanndleSubmit=async(e)=>{
   e.preventDefault();
   /**if email is ivalid based on Regex service,set the error state to true to show the message */
    if (!validEmail.test(email)) {
        setEmailErr(true);
     }
     /**if password is ivalid based on Regex service,set the error state to true and show the message */
     if (!validPassword.test(password)) {
        setPwdError(true);
     }
     /**if the email and password are valid,continue the request  */
     if(validEmail.test(email) && validPassword.test(password))
     {
        const logedUser = {username:email, password};
        /**loginUser from userApi.js,sending the request to the server where our database is */ 
        loginUser(logedUser)
            .then(res => {
                /**set isLoding to true so the Loading spinner can show up */
                /**the timeout is here just to set a delay so the spiner can be shown better */
                /**ButtonRender is used to condidionaly render Go Back button while the request is active */
                setButtonRender(false)
                setIsLoading(true);
                setTimeout(()=>{
                    localStorage.setItem("accessToken", res);
                    setUserToken(res);
                    /**isLoding is set to false for the spinner to stop showing */
                    setIsLoading(false);

                },500);
                
                
            })
            /**catch any errors */
            .catch(err => {
                setIsLoading(true);
                setTimeout(() => {
                    setMessage(err.response.data.message)
                    setIsLoading(false)
                    setButtonRender(true);
                }, 500);
            });
             /**initially success is set to false so the form can be shown and send the request ,after that is set to true so the response can be shown*/
            setSuccess(true);
            setEmail('');
            setPassword('');
           
     } 
   }

    return(
        <>
        {
            (
                success? (isLoading?(
                    // if the request in progress and the loading spinner is true show the spinner
                    <ContentWrapper success={success} loading={isLoading} butttonRender={ButtonRender} />
                    ):(
                        //when the request has finnished and the message is set show the message result
                        <ContentWrapper success={success} loading={isLoading} message={message} butttonRender={ButtonRender}/>
                    )
                ):(

            <div className=" flex justify-center items-center h-full">
        
            <form className="max-w-[400px] w-full mx-auto  bg-white p-8 rounded-xl z-0 " onSubmit={hanndleSubmit} >
                <BrandHeading title={"Sign In"}></BrandHeading>
            <div className=" flex flex-col mb-4">
                <label className="text-black p-2" >Email:</label>
                    <input className="border relative bg-gray-100 p-2 rounded-lg" type="text"
                     placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                    </div>
            <div className=" flex flex-col mb-4">
                <label className="text-black p-2" >Password:</label>
                    <input className="border relative bg-gray-100 p-2 rounded-lg " type="password" 
                        placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} required />
            </div>
            <button className='w-full py-3 mt-8  bg-black hover:bg-black/90 relative text-white rounded-xl  disabled:bg-gray-500'
                    disabled={email==='' &&  password===''} type="submit"  >Sign In</button>
            {emailErr && <div className="border relative border-none bg-red-400/90 p-2 rounded-lg text-center text-black mt-4 text-lg">Your email is invalid</div>}
            {pwdError && <div className="border relative border-none bg-red-400/90 p-2 rounded-lg text-center text-black mt-4 text-lg">Your password is invalid</div>}
                <ForgotPassword ></ForgotPassword>

            </form>
            </div>
            ))}
            </>
    )
}