import React from 'react'
import SignIn from '../SignIn'
import ProfileHome from '../ProfileHome';
import Footer from '../Footer';





function Profile({handleNameChange, handlePassChange, signIn, status, isSigned, userData, logout}) {
    
    

    return (
        <>
    
           { isSigned ? 
                <>
                    <ProfileHome userData={userData} logout={logout}/>
                    <Footer/>
                </>
                : 
                <SignIn 
                handleNameChange={handleNameChange} 
                handlePassChange={handlePassChange}
                signIn={signIn}
                status={status}
                />
           }
        </>
    )
}

export default Profile
