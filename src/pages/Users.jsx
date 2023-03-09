import React, {useContext} from 'react'
import Navbar from '../components/Navbar'
import UserCard from '../components/UserCard'
import AddUserBtn from '../components/AddUserBtn'
import {useState,useEffect} from 'react'
import { getUsers } from '../service/userApi';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {userContext} from "../App"
import { TextField, InputAdornment} from '@mui/material';
import styles from '../components/Dash.module.css'
import {AiOutlineSearch} from 'react-icons/ai'
import LoadingSpinner from "../components/LoadingSpinner";


function Users() {

  const {users, setUsers, userToken, setUserToken, currentUser} = useContext(userContext);
  const [selectedUsers, setSelectedUsers] = useState(users);
  const [isLoading, setIsLoading] = useState(false);



useEffect(()=>{
  if(currentUser && (currentUser?.role.permission.name != "ROLE_EMPLOYEE"))
  setIsLoading(true);

  getUsers().then(res => { 
       setTimeout(() => {
        setUsers(res);
         setIsLoading(false);
       }, 500);
  })
  .catch(() => {
    setIsLoading(false);
 });
},[currentUser])

  useEffect(()=>{
    setSelectedUsers(users);
},[users])

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    // setInputText(lowerCase);
    // console.log(inputText);
    if(!e.target.value){
      setSelectedUsers(users);
    } else
    setSelectedUsers(users.filter(u => u.firstName.toLowerCase().includes(`${lowerCase}`) || u.lastName.toLowerCase().includes(`${lowerCase}`)));
  }; 

  return (
    <>
    <Navbar/>
    <div className={["flex justify-center mt-3", styles.main].join(' ')}>
        <h2>

        </h2>
        <div className={["self-center ", styles.search].join(' ')}>
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
      <AddUserBtn/>
      <div className='flex flex-column flex-wrap justify-center mt-10 w-4/5'>
          {isLoading ? <LoadingSpinner/> : selectedUsers?.map((e)=>(
            <Link to={`/profile/${e?.email}`} key={e?.email}>
              <UserCard user={e}/>
            </Link>
          )
          )}


      </div>
      </div>
      </>
  )
}

export default Users