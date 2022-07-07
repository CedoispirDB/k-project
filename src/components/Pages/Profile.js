import React from 'react'
import SignIn from '../SignIn'
import ProfileHome from '../ProfileHome';
import Footer from '../Footer';





function Profile({ setSignedIn, setUserData, setLocalStorage, getUserData, isSigned, userData }) {



    return (
        <>

            {isSigned ?
                <>
                    <ProfileHome userData={userData}/>
                    <Footer />
                </>
                :
                <SignIn
                    setUserData={setUserData}
                    setSignedIn={setSignedIn}
                    setLocalStorage={setLocalStorage}
                    getUserData={getUserData}
                />
            }
        </>
    )
}

export default Profile
