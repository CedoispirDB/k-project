import React, { useState } from 'react'
import './css/SignIn.css'
import { Link, useNavigate } from 'react-router-dom';


function SignIn({  setSignedIn, setLocalStorage, getUserData }) {

    const navigate = useNavigate();

    const [nameInput, setNameInput] = useState();
    const [passInput, setPassInput] = useState();

    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState();

    const [display, setDisplay] = useState();


    // Handle user input for username
    function handleNameChange(event) {
        setShow(false);
        setNameInput(event.target.value);
    }

    // Handle user input for password
    function handlePassChange(event) {
        setShow(false);
        setPassInput(event.target.value);
    }


    async function handleSignIn() {
        let name = nameInput.replace(/\ $/, "");
        let pass = passInput.replace(/\ $/, "");

        if(show) {
            return;
        }
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
        getUserData(name, pass).then(resp => {
            if (resp !== undefined && Object.keys(resp.data).length > 0) {
                setSignedIn(true);
                setLocalStorage(name, pass, resp.data.response.series_data.M);
                navigate('/profile', { replace: true });
            } else {
                setDisplay(JSON.stringify(resp));
                setShow(true);
                setMsg("Username or password incorrect");   
            }
        });
    

    }

    return (
        <>

            <div className='container'>
                <div className='sign_in_container'>
                    <div className='sign_in_wrapper'>
                        <h2 className='sign_in_title'>{display}</h2>
                        {/* <label type="fname" className='username_label'>Username: </label> */}
                        <input
                            type="text"
                            name="usernameInput"
                            onChange={handleNameChange}
                            className='username_field user_input'
                            placeholder='Username'
                        />
                        <br />
                        {/* <label type="pwd" className='pass_label'>Password: </label> */}
                        <input
                            type="password"
                            name="passInput"
                            onChange={handlePassChange}
                            className='pass_field user_input'
                            placeholder='Password'
                        /><br />
                        {show && <div className='error_msg'>{msg}</div>}
                        {/* <Link to="/profile" className='btn_link'> */}
                        <button onClick={handleSignIn} className='btn_sign'>Sign in</button>
                        {/* </Link> */}
                        <div className='question'>Doesn't have an account?</div>
                        <Link to="/sign-up" className='btn_sign sign_up_btn'>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>


        </>
    )
}

export default SignIn
