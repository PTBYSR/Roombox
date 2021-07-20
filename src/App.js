import React, { useEffect, useState }  from 'react';
import './App.css';
import Sidebar from './Sidebar' 
import Login from './Login' 
import Chat from './Chat'
import Pusher from 'pusher-js'
import axios from './axios'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useStateValue } from './StateProvider'

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [messages, setMessages] = useState([]);
  
  
  
  // useEffect(() => {
  //   axios.get('/messages/sync')
  //   .then((response) => {
  //     console.log(response.data)
  //     setMessages(response.data)})  
  //   }, [])
    
    
  
  // useEffect(() => {
  //   const pusher = new Pusher('5b2e864f4b16a436c926', {
  //     cluster: 'mt1'
  //   });
  
  //   const channel = pusher.subscribe('messages');
  //   channel.bind('inserted', (newMessage) => {
  //     setMessages([...messages, newMessage])
  //   });

    
    
  //   return () => {
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   }
  // }, [messages])
  console.log(messages);
  

  return (
    <div className="app">

      { !user ? (
        <Login />
      ) : (
      <div className="app__body">
      <Router>
          <Sidebar />
        <Switch>
          <Route path="/rooms/:roomId">
            <Chat addGif/>
          </Route>
          <Route path="/">
            <Chat messages={messages}/>
          </Route>
        </Switch>
      </Router>
      </div> )}
    </div>
  );
}

export default App;
