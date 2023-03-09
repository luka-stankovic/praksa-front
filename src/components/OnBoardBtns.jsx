import { IoIosAddCircle } from 'react-icons/io';
import Popup from '../components/Popup'
import {useState,useEffect,useContext} from 'react'
import styles from "../components/Popup.module.css"
import { getUsers } from '../service/userApi';
import Multiselect from 'multiselect-react-dropdown';
import { addOnboarding, getOnboardings } from '../service/onboardingApi'
import {userContext} from "../App"
import TaskCardMentorsPerm from './TaskCardMentorsPerm';
import Select from 'react-select'




function OnBoardBtns(){
    const [buttonPopup,setButtonPopup] = useState(false);
    const[users, setUsers] = useState([]);
    const {onboardings, setOnboardings, currentUser, setCurrentUser} = useContext(userContext);
    // const [name, setName] = useState('');
    // const [description, setDescription] = useState('');

    const [newOnboarding, setNewOnboarding] = useState({
        name : '',
        description : ''
    });

    const[selectedmod, selectMod] = useState([]);
    console.log(selectedmod)
    useEffect(()=>{
        if(currentUser?.role.permission.name != "ROLE_EMPLOYEE")
          getUsers().then(res => setUsers(res));
    },[])
    console.log(users);

    const opts = users?.filter(user => user.role.permission.name != "ROLE_EMPLOYEE" && !selectedmod.find(u => u.value.email == user.email)).map(user => ({label: `${user.firstName} ${user.lastName}`, value: {email: user.email, avatar: user.avatar, actions: ['create_task', 'edit_task','delete_task']}}));
    // console.log(opts);

    const handleSubmit = (e) => {
      const data = { name: newOnboarding.name,description: newOnboarding.description, mentors: selectedmod.map(mod => mod.value)};
      console.log(data); 
      addOnboarding(data).then(res => setOnboardings(prev => [...prev, res]));
      setButtonPopup(false);
      setNewOnboarding((e) => setNewOnboarding(prev => ({...prev, name:'' , description: ''})));

      selectMod([]);
    }

    const setMentorPermissions = (mentor) => {
        console.log(mentor);
        selectMod(prev => prev.map(mod => mod.value.email == mentor.value.email ? mentor: mod));
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


    return(
        <div>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <div className="flex flex-col p-7">
                    <form onSubmit={handleSubmit} className='flex flex-col space-y-5 justify-center text-center'>
                        <label>Onboarding name</label>
                        <input 
                        required
                        value={newOnboarding?.name}
                        onChange={(e) => setNewOnboarding(prev => ({...prev, name:e.target.value}))}
                        className={[styles.inputbox].join(' ')} type="text"></input>
                        <label>Onboarding description</label>
                        <textarea
                        required
                        value={newOnboarding?.description}
                        onChange={(e) => setNewOnboarding(prev => ({...prev, description:e.target.value}))}
                        className={["",styles.inputbox].join(' ')} type="text"></textarea>
                        <label>Add moderators</label>

                        <div>
                        <Select options={opts} onChange = {(e)=> onMentorChange(e)} isMulti />
                        </div>

                        {selectedmod.length != 0 && <label>Choose moderator permissions</label>}
                            <div className='flex flex-row justify-around flex-wrap'>
                                {selectedmod?.map(e=>{
                                    // console.log(e);
                                    return(
                                        <TaskCardMentorsPerm key={e.id} modsinfo={e} onUpdate={setMentorPermissions}/>
                                    )
                                })}
                            </div>

                            
                            <button onClick={handleSubmit} className={["self-center",styles.savebtn].join(' ')} type="button" value="save">Add</button> 
                    </form>

                </div>
            </Popup>            
            <button className='fixed bottom-3 right-3 hover:text-green-700' onClick={()=>setButtonPopup(true)}>
                <IoIosAddCircle
                    size="80px"
                    
                />
            </button>
        </div>
    );
}

export default OnBoardBtns;