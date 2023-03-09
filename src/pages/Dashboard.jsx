import React from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import OnBoardBtns from '../components/OnBoardBtns'
import { getOnboardings } from '../service/onboardingApi';
import {useState,useEffect,useContext} from 'react'
import {userContext} from "../App"
import { TextField, InputAdornment } from '@mui/material';
import styles from '../components/Dash.module.css'
import {AiOutlineSearch} from 'react-icons/ai'
import LoadingSpinner from "../components/LoadingSpinner";

function Dashboard() {
  const {onboardings, setOnboardings,  currentUser, setCurrentUser, userToken, setUserToken} = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    setIsLoading(true);
    // getOnboardings().then(res => {
    //   setOnboardings(res);
    //   setIsLoading(false);
    // })
    getOnboardings().then(res => { 
         setTimeout(() => {
          setOnboardings(res);
           setIsLoading(false);
         }, 500);
    })
    .catch(() => {
      setIsLoading(false);
   });
},[userToken])


  const [selectedOnboardings, setSelectedOnboardings] = useState(onboardings);
  console.log(selectedOnboardings);

  useEffect(()=>{
    setSelectedOnboardings(onboardings);
},[onboardings])

  // console.log(currentUser?.role.permission);
  // const [inputText, setInputText] = useState("");


  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    // setInputText(lowerCase);
    // console.log(inputText);
    if(!e.target.value){
      setSelectedOnboardings(onboardings);
    } else
    setSelectedOnboardings(onboardings.filter(so => so.name.toLowerCase().includes(`${lowerCase}`)));
  }; 

  return (
    <>
      <Navbar/>
      <div className={["flex justify-center mt-3", styles.main].join(' ')}>
        <h2>

        </h2>
        <div className={["self-center relative z-[9]", styles.search].join(' ')}>
          <TextField 
            id="outlined-basic"
            onChange={inputHandler}
            variant="standard"
            fullWidth
            label="Search" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AiOutlineSearch />
                </InputAdornment>
              ),
            }}      
          />
        </div>

      </div>
      <div className='flex justify-center'>
      {(currentUser && (currentUser?.role.permission.name != "ROLE_EMPLOYEE")) && <OnBoardBtns/>}

        <div className='flex flex-row flex-wrap mt-10 w-4/5 justify-center'>
        {isLoading ? <LoadingSpinner/> : selectedOnboardings?.map((e)=>{
          return (
          <Card key={e?.id} card={e}/>
          );})}

        </div>

      </div>


    </>

  )
}

export default Dashboard