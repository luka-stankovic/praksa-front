import styles from './Card.module.css'
import OnboardName from './OnboardName';
import ProgressCircle from './ProgressCircle';
import EnterButton from './EnterButton';
import { Routes, Route, Link } from "react-router-dom";
import {userContext} from "../App"
import {useState,useEffect,useContext} from 'react'
import {deleteOnboarding} from '../service/onboardingApi';
import {AiFillDelete} from 'react-icons/ai'
import NewUsers from './NewUsers';
import EditOnboard from './EditOnboard';
import '../index.css'
import {Avatar, AvatarGroup} from '@mui/material'

function Card({card}){
    const {onboardings, setOnboardings} = useContext(userContext);
    const {users, setUsers, currentUser, setUserCurrent} = useContext(userContext);
    // console.log(users);
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
      setModal(!modal);
    };

    const deleteCard = () => {
        deleteOnboarding(card.id).then(res => {
            // console.log(res);
            setOnboardings(onboardings.filter(onboarding => onboarding.id !== card.id));
            
        }).catch(err => console.log(err));

    }  

    
    console.log(card);

    const addUsers = (newUsers) => {
        card.users.concat(newUsers.map(user => users.find(usr => usr.email == user)));
    }


    return(
        <>
         <div className={["flex flex-col p-5 text-white ml-7 mr-7 mb-10 hover:border-dashed hover:shadow-lg", styles.card].join(' ')}>
                    <Link to={`/onboarding/${card?.id}`}>
                    <div className='flex flex-col'>
                        <OnboardName name={card?.name}/>
                        {(currentUser && (currentUser?.role.permission.name != "ROLE_ADMIN" && card.isMentor != true)) &&  <ProgressCircle perc = {card}/>}
                        {(currentUser && (currentUser?.role.permission.name == "ROLE_ADMIN" || card.isMentor)) &&  
                        <div className={["flex self-center mt-8 mb-10 w-full", styles.description].join(' ')}>
                            <p className='line-clamp-5'>{card?.description}</p>
                        </div>
                                              
                       
                        }

                    
                    </div>

                    </Link>
                    {(currentUser && (currentUser?.role.permission.name == "ROLE_ADMIN" || card.isMentor)) && 
                    <div className="flex w-full flex-row h-10 bg-gray-100 mt-5 justify-center">
                    <EditOnboard onboard={card}/>
                    <NewUsers onboardingId={card?.id} onUserAdd={addUsers}/>
                    <button onClick={toggleModal}  className='block ml-3 hover:text-red-500'>
                        <AiFillDelete
                            size="25px"
                            
                        />
                    </button>
                    {modal && (
                        <div className="modal text-black">
                            <div onClick={toggleModal} className="overlay"></div>
                            <div className="modal-content">
                                <h2>ARE YOU SURE YOU WANT TO DELETE THIS ONBOARDING?</h2>
                                <div className='mt-10 flex flex-row space-x-8'>
                                <button onClick={deleteCard} className="text-red-600">
                                    DELETE
                                </button>
                                <button className="close-modal" onClick={toggleModal}>
                                    CLOSE
                                </button>
                                </div>

                            </div>
                        </div>
                    )}
            
                    </div>
                    }

               

               


            </div>        


        </>



    );



}

export default Card;