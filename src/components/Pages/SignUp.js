import React, { useState } from 'react'
import '../css/SignIn.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function SignUp({ isSignedIn, setSignedIn, usernames, location, signUp}) {

    const navigate = useNavigate();

    const [nameInput, setNameInput] = useState();
    const [passInput, setPassInput] = useState();
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState();



    function handleNameChange(event) {
        setNameInput(event.target.value);
    }

    function handlePassChange(event) {
        setPassInput(event.target.value);
    }


    function handleSignUp() {
        if (nameInput === undefined) {
            setShow(true);
            setMsg("Please type an username")
            return;
        }

        if (passInput === undefined) {
            setShow(true);
            setMsg("Please type a password")
            return;
        }

        if (usernames.includes(nameInput)) {
            setShow(true);
            setMsg("Username already in use");
            return
        }

        signUp(nameInput, passInput);


        navigate('/', { replace: true })


    }

    function handleBack() {
        navigate('/profile', { replace: true })
    }


    return (
        <>
            <div className='container'>
                <div className='sign_in_container'>
                    <h2 className='sign_in_title'>Sign Up</h2>
                    {/* <label type="fname" className='username_label'>Username: </label> */}
                    <input 
                        type="text" 
                        name="usernameInputUp" 
                        onChange={handleNameChange} 
                        className='username_field user_input' 
                        autoComplete='off' 
                        placeholder='Username'
                    /><br/>
                    {/* <label type="pwd" className='pass_label'>Password: </label> */}
                    <input 
                        type="password" 
                        name="passInputUp user_input" 
                        onChange={handlePassChange} 
                        className='pass_field' 
                        autoComplete='off' 
                        placeholder='Password'
                    /><br />
                    {show && <div className='error_msg'>{msg}</div>}
                    <button onClick={handleSignUp} className='btn_sign btn_sign_up'>Sign up</button>
                    <br/>
                    <button onClick={handleBack} className='btn_sign back_btn'>Back</button>
                </div>
            </div>


        </>
    )
}

export default SignUp
