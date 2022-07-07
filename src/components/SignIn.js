import React, { useState } from 'react'
import './css/SignIn.css'
import { Link, useNavigate } from 'react-router-dom';


function SignIn({ setUserData, setSignedIn, setLocalStorage, getUserData }) {

    const navigate = useNavigate();

    const [nameInput, setNameInput] = useState();
    const [passInput, setPassInput] = useState();

    let show = false;

    // Handle user input for username
    function handleNameChange(event) {
        setNameInput(event.target.value);
    }

    // Handle user input for password
    function handlePassChange(event) {
        setPassInput(event.target.value);
    }


    async function handleSignIn() {
        getUserData(nameInput, passInput).then(resp => {
            console.log(resp.data.response.series_data.M)
            if (resp !== undefined && Object.keys(resp.data).length > 0) {
                setSignedIn(true);
                setLocalStorage(nameInput, passInput, resp.data.response.series_data.M);
                navigate('/profile', { replace: true });
            } else {
                show = true;
            }
        });
    

    }

    return (
        <>

            <div className='container'>
                <div className='sign_in_container'>
                    <div className='sign_in_wrapper'>
                        <h2 className='sign_in_title'>Sign In</h2>
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
                        {show && <div className='error_msg'>Username or password incorrect</div>}
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
