import React, { useEffect, useState }  from 'react';
import './Sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import { Avatar, IconButton } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { SearchOutlined } from '@material-ui/icons'
import SidebarChat from './SidebarChat'
import db from './firebase'
import { useStateValue } from './StateProvider'



const Sidebar = () => {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        // const unsubscribe = 
        db.collection('rooms').onSnapshot((snapshot) =>
        snapshot.docChanges(
        
        setRooms(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
            ))
        )
         

        // return () => {
        //     unsubscribe();
        // }
    
    }, [])

    useEffect(() => {

    }, [])

    const [input, setInput] = useState("");
    
    const onEnter = (e) => {
        e.preventDefault();
    }



    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                {/* <Avatar src={user?.photoURL}/> */}
                    <h1><span className="hi">hi  </span> {user.displayName}</h1>
                    <div className="sidebar__headerRight">
                        {/* <IconButton>
                            <DonutLargeIcon />
                        </IconButton>
                        <IconButton>
                            <ChatIcon />
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton> */}
                    </div>
                </div>  
                {/* <div className="sidebar__search">
                    <div className="sidebar__searchContainer">
                        <SearchOutlined />
                        <input type="text" placeholder="Search or start nre chat" id="" />
                    </div>
                </div> */}
                
                {/* <div className="chat__footer">
                <form>
                 <input
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 placeholder="Add New Room"
                 type="text"></input>
                 <button
                    type="submit"
                    onClick={onEnter}>
                    Send a message    
                 </button>
                </form>
            </div>                 */}
                
                <div className="sidebar__chats">
                    <SidebarChat addNewChat/>
                    {rooms.map(room => (
                        <SidebarChat 
                            key={room.id}
                            id={room.id}
                            name={room.data.name} />    
                    ))}
                </div>
        </div>
    )
}

export default  Sidebar 

