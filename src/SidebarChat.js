import './SidebarChat.css'
import { Avatar, Button } from '@material-ui/core'
import React, { useEffect, useState }  from 'react';
import db from './firebase'
import { Link, useHistory, withRouter } from 'react-router-dom'
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import firebase from 'firebase'

const SidebarChat = ({ id, name, addNewChat}) => {
    const history = useHistory();
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState('');
    const [color, setColor] = useState('');
    const [messages, setMessages] = useState('');


    useEffect(() => {
        if (id) {
            db.collection('rooms')
                .doc(id)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) => 
                doc.data())))
        }

    }, [id]);
    
    useEffect(() => {
        
        const meme = [
            "2EmNcY9uJ7I373VM2s",
            "vS8deMiryn69PFGwJQ",
            "ec9bGkgjnLFDpby9Cs",
            "V3r3aWgdMJdv1njDRk",
            "Z4w6YDHh9uRq6QtamB",
            "6R0sovjJNBWemFbyir",
            "YTEHHsDnIzuPA7hd7Z",
            "LVrHEIxyJRaq89XlwN",
            "mnFNB5IIabdgVve3zb",
            "cJtwNa9yT63c89rywK",
            "Sd81Z3bzmiyiBpGf3y"
        ]
        const random = Math.floor(Math.random() * meme.length);
        setSeed(meme[random])
        
    }, []);

    const createChat = (e) => {
        const roomName = input
        e.preventDefault()
        console.log(e)
        console.log('firebase ran')
    
        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            })
        }
        setInput('');
    }

    
    function DeleteCollection() {
        
        history.push('/')
        db.collection('rooms').doc(id).delete();
        console.log('you must delete')
    }


    return !addNewChat ? (<div>
        
                <Link to={`/rooms/${id}`}>
                        <div className="sidebarChat">
                            <Avatar className='group__profile'src={`https://media.giphy.com/media/${seed}/giphy.gif
                    `}/>
                            <div className="sidebarChat__info">
                                <h1> {name} group</h1>
                                <p>{messages[0]?.message}...</p>
                                <span className="chat__timestamp">
                                    { messages[0]?.timestamp ? new Date(messages[0]?.timestamp?.toDate()).toLocaleTimeString() : ''}
                                </span>
                            </div>
                    {/*
                                        <HighlightOffRoundedIcon className="deleteButton"
                                        onClick={
                                            () => {
                                            DeleteCollection()}}/> */}
        
        
                        </div>
                    </Link>
    </div>
            
    ) : (
        <div >
            {/* <div className="sidebarChat">
                <h2>Add new Room</h2>
            </div> */}
            <div className="chat__header-input">
                <form>
                 <input
                 maxlength="10"
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 placeholder="Add a New Group here ..."
                 type="text"/>
                 <button
                    type="submit"
                    onClick={createChat}>
                    Add a new Group   
                 </button>
                </form>
            </div>
        </div>
    )
}

export default SidebarChat
