import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import './Chat.css'
import InsertEmoticon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import axios from './axios';
import db from './firebase'
import firebase from 'firebase';
import { useStateValue } from './StateProvider'


const Chat = ({ addGif }) => {
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([])
    const [{ user, dispatch }] = useStateValue();
    const [seed, setSeed] = useState('');

    useEffect(() => {
        const meme =[
            "9PnJrN5KHO7YHj0yW1",
            "8cpfWLVqz1pB8NxliP",
            "RlTIpKvxcE8tOJbZ04",
            "SUtvUAbKeBXiVdqCMB",
            "p3vzYCIdKAnIRMqO5d",
            "IbOMk6rPgInyde8fLL",
            "TgxKA4dyYtQBdxmIcb",
            "d3mmm2VHIiBkSqBO",
            "3ohhwMsgVMVCu2TKHS" 
        ]
        const random = Math.floor(Math.random() * meme.length);
        console.log(random, meme[random])
        setSeed(meme[random])
        console.log(seed)
    }, []);


    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => 
                    doc.data()))
                )
        }
    }, [roomId])


    const onEnter = async (e) => {
        e.preventDefault();
    
        // await axios.post('/messages/new', {
        //     message: input,
        //     name: 'demo',
        //     timestamp: 'just now',
        //     received: false,
        // });

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
            <Avatar src={`https://media.giphy.com/media/${seed}/giphy.gif`}/>

                {roomName?
                    <div className="chat__headerInfo">
                    <h3>{roomName} group</h3>
                    <p className="new">Last seen at . . . {''}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()}
                    </p>
            </div>
                    : 
                    <h3>Create a group</h3>
                }
            
            <div className="chat__headRight">
                {/* <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton> */}
            </div>
            </div>
            <div className="chat__body">
                 {messages.map((message) => (
                    <div>
                        <p className={`chat__message ${
                            message.name === user.displayName && 'chat__receiver'
                        }`}>
                        {/* <p className={`chat__message  ${message.received &&"chat__receiver"}`}> */}
                        
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toLocaleString()}
                        </span>
                        </p>
                    </div>
                 ))}
                

            </div>

            <div className="chat__footer">
                <form>
                 <input
                 maxlength="20"
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 placeholder="Type a message"
                 type="text"></input>
                 <button
                    type="submit"
                    onClick={onEnter}>
                    Send a message    
                 </button>
                </form>
            </div>
        </div>
    )
}

export default Chat
