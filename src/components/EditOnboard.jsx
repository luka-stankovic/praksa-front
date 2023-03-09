import Popup from '../components/Popup'
import {useState,useEffect,useContext} from 'react'
import styles from "../components/Popup.module.css"
import { getUsers } from '../service/userApi';
import Multiselect from 'multiselect-react-dropdown';
import { addOnboarding, editOnboarding, getOnboardings } from '../service/onboardingApi'
import {userContext} from "../App"
import {AiFillEdit} from 'react-icons/ai'
import TaskCardMentorsPerm from './TaskCardMentorsPerm';
import Select from 'react-select'

function EditOnboard({onboard}) {
    const [buttonPopup,setButtonPopup] = useState(false);
    const {users, setUsers, onboardings, setOnboardings,  currentUser, setCurrentUser} = useContext(userContext);
  

    const [editedOnboarding, setEditedOnboarding] = useState({
        name : onboard?.name,
        description : onboard?.description
    });


    const viewmods = onboard?.users;
    console.log(viewmods);
    const[selectedmod,selectMod] = useState(onboard?.users?.filter(us => us.isMentor).map(u =>({label: `${u.user.firstName} ${u.user.lastName}`, value: {email: u.user.email, avatar: u.user.avatar, actions: u.permission?.actions }})));
    console.log(selectedmod);
    const alreadymods = viewmods?.filter(us => us.isMentor).map(u =>({label: `${u.user.firstName} ${u.user.lastName}`, value: {email: u.user.email,avatar: u.avatar, actions: u.permission?.actions }}));

    const opts = users?.filter(user => user.role.permission.name != "ROLE_EMPLOYEE" && !alreadymods?.find(u => u.value.email == user.email)).map(user => ({label: `${user.firstName} ${user.lastName}`, value: {email: user.email,avatar: user.avatar, actions: ['create_task', 'edit_task','delete_task']}}));

    const handleSubmit = (e) => {
      const data = { name: editedOnboarding.name,description: editedOnboarding.description, mentors: selectedmod ? selectedmod.map(mod => mod.value) : []};  
      editOnboarding(onboard?.id, data).then(res => setOnboardings(prev => prev.map(onb => onb.id != onboard.id ? onb : res)));
      setButtonPopup(false);
    }

    const setMentorPermissions = (mentor) => {
        selectMod(prev => prev?.map(mod => mod.value.email == mentor.value.email ? mentor: mod));
    }

    const onMentorChange = (e) => {
        selectMod(prev => {
            if(e.length < prev.length) {
                return [...prev.filter(el => e.includes(el))];
            }else{
                return [...prev, e[e.length-1]];
            }
        })
    }

  return (
    <>
    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div className="flex flex-col p-7">
            <form onSubmit={handleSubmit} className='flex flex-col space-y-5 justify-center text-center text-black'>
                        <label>Onboarding name</label>
                        <input 
                        value={editedOnboarding?.name}
                        onChange={(e) => setEditedOnboarding(prev => ({...prev, name:e.target.value}))}
                        className={[styles.inputbox].join(' ')} type="text"></input>
                        <label>Onboarding description</label>
                        <textarea
                        value={editedOnboarding?.description}
                        onChange={(e) => setEditedOnboarding(prev => ({...prev, description:e.target.value}))}
                        className={["",styles.inputbox].join(' ')} type="text"></textarea>
                        <label>Add moderators</label>


                        <div>
                        <Select defaultValue={selectedmod} options={opts} onChange = {(e)=> onMentorChange(e)} isMulti />

                        </div>
                        {selectedmod != [] && <label>Choose moderator permissions</label>}
                            <div className='flex flex-row justify-around flex-wrap'>
                                {selectedmod?.map(s =>{
                                    return(
                                        <TaskCardMentorsPerm key={s?.id} modsinfo={s} onUpdate={setMentorPermissions}/>
                                    )                                    
                                })}
                        </div>
                            
                            <button onClick={handleSubmit} className={["self-center",styles.savebtn].join(' ')} type="button" value="save">Save</button> 
            </form>

        </div>
    </Popup>
    <button onClick={()=>setButtonPopup(true)}>
        <AiFillEdit className='hover:text-blue-600 mr-3'
            size="25px"
        />       
    </button>
    </>
  )
}

export default EditOnboard