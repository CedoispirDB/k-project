import React from 'react'
import './css/SignIn.css'
import { Link, useNavigate } from 'react-router-dom';

function SignIn({ handleNameChange, handlePassChange, signIn, status, signUp }) {

    const navigate = useNavigate();
    function handleSignIn() {
        
        signIn();
        if (status) {
            navigate('/profile', { replace: true })
        }

    }

    return (
        <>

            <div className='container'>
                <div className='sign_in_container'>
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
                    {status && <div className='error_msg'>{status}</div>}
                    {/* <Link to="/profile" className='btn_link'> */}
                    <button onClick={handleSignIn} className='btn_sign'>Sign in</button>
                    {/* </Link> */}
                    <div className='question'>Doesn't have an account?</div>
                    <Link to="/sign-up" className='btn_sign sign_up_btn'>
                        Sign Up
                    </Link>
                </div>
            </div>


        </>
    )
}

export default SignIn
