import React from 'react'
import "./Login.css"
import { Button } from "@material-ui/core"
import { auth, provider } from './firebase'
import {actionTypes} from './reducer'
import { useStateValue } from './StateProvider'


const Login = () => {
    const [{ user }, dispatch] = useStateValue();
    
    const signIn = () => {
        auth
         .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((err) => alert(err.message))

    }
    
    return (
        <div className="login">
            <div className="login__container">
                
                <img src="https://media.giphy.com/media/dQpqkxXyPvb2iImius/giphy.gif"/>
                <div className="login__text">
                    <p>WELCOME TO</p>
                    <h1 className="roomBox__logo">Roombox&copy;</h1>
                </div>
                <Button  onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
