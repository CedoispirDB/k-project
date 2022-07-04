import React from 'react'
import './css/SignIn.css'
import { Link} from 'react-router-dom';

function SignIn({ handleNameChange, handlePassChange, signIn, status, signUp}) {




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
                        className='username_field' 
                        placeholder='Username'
                    /> 
                    <br/>
                    {/* <label type="pwd" className='pass_label'>Password: </label> */}
                    <input 
                        type="password" 
                        name="passInput" 
                        onChange={handlePassChange} 
                        className='pass_field'
                        placeholder='Password'
                    /><br />
                    {status && <div className='error_msg'>{status}</div>}
                    <Link to="/profile" className='btn_link'>
                        <button onClick={signIn} className='btn_sign'>Sign in</button>
                    </Link>
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
