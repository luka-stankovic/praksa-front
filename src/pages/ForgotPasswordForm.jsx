import {useState} from 'react';
import bgimg from '../images/bglog.png'
import BrandHeading from '../components/BrandHeading';
import { validEmail } from '../service/Regex';
import { resetPassword } from '../service/userApi';
import ContentWrapper from '../components/ContentWrapper'

const ForgotPasswordForm = () => {
    
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [message, setMessage] = useState('');
    const [success,setSuccess]=useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ButtonRender, setButtonRender] = useState(false);

   
   /**function that is called from the onSubmit event from the button in the form to hanndle our reset password request */
    const hanndleSubmit=async(e)=>
    {
        e.preventDefault();
        setMessage("");
        /**function that checks if email is invalid based on Regex service and sets emain error to true */
        if (!validEmail.test(email)) {
            setEmailErr(true);
         }
         /**if the email is valid procced with the password reset request */
         if(validEmail.test(email))
         {
            const reset = {email};
            /**resetPassword from userApi.js,sending the request to the server where our database is,checks if the email exist in the database for the reset and returns a response */

             resetPassword(reset)
             .then(res =>{
                /**set isLoding to true so the Loading spinner can show up */
                /**the timeout is here just to set a delay so the spiner can be shown better */
                /**ButtonRender is used to condidionaly render Go Back button while the request is active */
                setButtonRender(false);
                setIsLoading(true);
                setTimeout(() => {
                    setMessage(res);
                    /**isLoding is set to false for the spinner to stop showing */
                    setIsLoading(false)
                    setButtonRender(true);
                }, 1000);

        }) 
        /**catch any errors */
        .catch(err => 
            
            {
              setIsLoading(true)
              setTimeout(() => {
                setMessage(err.response.data.message);
                setIsLoading(false);
                setButtonRender(true);

              }, 500);  
            });
        /**initially success is set to false so the form can be shown and send the request ,after that is set to true so the response can be shown*/
        setSuccess(true);
        console.log(message);
        setEmail("");
         }
    }

    return (  
        <>
        
            {
                success? (isLoading?(
                    // if the request in progress and the loading spinner is true show the spinner
                    <ContentWrapper success={success} loading={isLoading} butttonRender={ButtonRender} />
                    ):(
                        //when the request has finnished and the message is set show the message result
                        <ContentWrapper success={success} loading={isLoading} butttonRender={ButtonRender} message={message} />
                    )
                ):(
                    
                    <div className="relative w-full h-screen  bg-zinc-500/10">
                            <img className="absolute w-full h-full object-cover mix-blend-overlay" src={bgimg} alt="/" />
                        <div className=" flex justify-center items-center h-full">
        
                            <form className="max-w-[400px] w-full mx-auto  bg-white p-8 rounded-xl z-0 " onSubmit={hanndleSubmit}>
                                    <BrandHeading title={"Send a request"}></BrandHeading>
                                <div className=" flex flex-col mb-4">
                                    <label className="text-black p-2" >Email:</label>
                                        <input className="border relative bg-gray-100 p-2 rounded-lg" type="text"
                                        placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                                </div>
                
                                <button className='w-full py-3 mt-8  bg-black hover:bg-black/90 relative text-white rounded-xl  disabled:bg-gray-500'
                                        disabled={email===''} type="submit" >Send Request</button>
                                    {emailErr && <div className="border relative border-none bg-red-400/90 
                                                    p-2 rounded-lg text-center text-black mt-4 text-lg">Email must contain @enjoying.rs</div>}
                            </form>
                        </div>
                     </div>

                )
            }

            
        </>
    );

}
 
export default ForgotPasswordForm;