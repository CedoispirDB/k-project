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
                watched: { "S": "0" },
                watching: { "S": "0" },
                want_to_watch: { "S": "0" }
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
        let name = nameInput.replace(/\ $/, "");
        let pass = passInput.replace(/\ $/, "");

        if (name === undefined) {
            setShow(true);
            setMsg("Please type an username")
            return;
        }

        if (pass === undefined) {
            setShow(true);
            setMsg("Please type a password")
            return;
        }

        usernames = usernames.map(username => {return username.S});
        if (usernames.includes(name)) {
            setShow(true);
            setMsg("Username already in use");
            return
        }

        addNewUser(name, pass);
        saveUsername(name);
        setSignedIn(true);
        setLocalStorage(name, pass, {
            user_series: {"L": []},
            watched: {"S": 0},
            watching: {"S": 0},
            want_to_watch: {"S": 0}
        });
        

        navigate('/', { replace: false })


    }

    function handleBack() {
        navigate('/profile', { replace: false })
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
