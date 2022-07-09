import React from 'react'
import SignIn from '../SignIn'
import ProfileHome from '../ProfileHome';
import Footer from '../Footer';
import Loading from './Loading';





function Profile({ setSignedIn, setLocalStorage, getUserData, isSigned, userData, loading}) { 
    
   
    
    return (
        <>
            {isSigned ?
                <>
                    <ProfileHome userData={userData}/>
                    <Footer />
                </>
                :
                <SignIn
                    setSignedIn={setSignedIn}
                    setLocalStorage={setLocalStorage}
                    getUserData={getUserData}
                />
            }
        </>
    )
}

export default Profile
