import React, { useState } from 'react'
import '../css/SignIn.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function SignUp({ isSignedIn, setSignedIn, usernames, setLocalStorage}) {

    const navigate = useNavigate();

    const [nameInput, setNameInput] = useState();
    const [passInput, setPassInput] = useState();
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState();

    async function addNewUser(username, password) {
        const res = await axios.post('https://eu-1.lolo.co/nuMt2ZKatFKC2uCKN1VAjB/addNewUser', {
            username: username,
            password: password,
            series_data: {
                user_series: { "L": [] },
                watched: { "N": "0" },
                watching: { "N": "0" },
                want_to_watch: { "N": "0" }
            }
    
        })
        console.log(res);
    }

    async function saveUsername(username) {
        const res = await axios.put('https://eu-1.lolo.co/nuMt2ZKatFKC2uCKN1VAjB/saveUsername', { 
            username: {"L": [{"S": username} ]}
        })
    
        console.log(res.data);
    }


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

        // if (usernames.includes(nameInput)) {
        //     setShow(true);
        //     setMsg("Username already in use");
        //     return
        // }

        addNewUser(nameInput, passInput);
        saveUsername(nameInput);
        setSignedIn(true);
        setLocalStorage(nameInput, passInput, {
            user_series: {"L": []},
            watched: {"N": 0},
            watching: {"N": 0},
            want_to_watch: {"N": 0}
        });
        

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
                    <input 
                        type="text" 
                        name="usernameInputUp" 
                        onChange={handleNameChange} 
                        className='username_field user_input' 
                        autoComplete='off' 
                        placeholder='Username'
                    /><br/>
                    <input 
                        type="password" 
                        name="passInputUp" 
                        onChange={handlePassChange} 
                        className='pass_field user_input' 
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
