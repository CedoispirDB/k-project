import './App.css';
import Navbar from './components/Navbar'
import axios from "axios"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './components/Pages/Home'
import Info from './components/Pages/Info'
import Profile from './components/Pages/Profile';
import SignUp from './components/Pages/SignUp';
import UserSeries from './components/Pages/UserSeries';
import Search from './components/Pages/Search';
import Footer from './components/Footer';
import savedData from './data/data.json'
import Loading from './components/Pages/Loading';




const LOCAL_STORAGE_KEY = "k_project"
const LOCAL_STORAGE_KEY_USER = "user_data"


function App() {

  const [signedIn, setSignedIn] = useState(false);
  const [userData, setUserData] = useState();
  const [usernames, setUsernames] = useState();
  const [loading, setLoading] = useState(false);
  const [save, setSave] = useState(false);
  const [currentUsername, setCurrentUsername] = useState();
  const [currentPassword, setCurrentPassword] = useState();




  // const [status, setStatus] = useState(false);
  // const [btnClicked, setBtnClicked] = useState(false);

  const [series, setSeries] = useState([]);
  const [pageNum, setPageNum] = useState(false);

  // const [logedIn, setLogedIn] = useState(false);


  async function getUserData(username, pass) {
    if (username !== undefined && pass !== undefined) {
      let resp = await axios.get(`https://eu-1.lolo.co/nuMt2ZKatFKC2uCKN1VAjB/getUserData?username=${username}&password=${pass}`);
      return resp;

    }
  }

  // Get data from local storage and load all usernames
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    const user_stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USER));

    setSeries(savedData);

    async function getAllUsernames() {
      await axios.get('https://eu-1.lolo.co/nuMt2ZKatFKC2uCKN1VAjB/getAllUsernames')
        .then((res) => {
          setUsernames(res.data.response.usernames_list.L);

        })
    }

    getAllUsernames();


    if (stored !== null && user_stored !== null) {
      setCurrentUsername(stored.username);
      setCurrentPassword(stored.pass);
      // console.log("here: "+ stored);
      // setUserData(user_stored.userData);
      setSignedIn(true);
      setLoading(true);
      getUserData(stored.username, stored.pass).then((resp) => {
        if (resp !== undefined && Object.keys(resp.data).length > 0) {
          setUserData(resp.data.response.series_data.M);
          setLoading(false);
        }
      })


    }
  }, []);

  // Change page number foward
  const nextPage = () => {
    setPageNum(pageNum + 1);
    window.scrollTo(0, 0)

  }

  // Change page number backwards
  const prevPage = () => {
    setPageNum(pageNum - 1);
    window.scrollTo(0, 0);
  }

  // OnClick sign in function
  function setLocalStorage(username, pass, userData) {
    setUserData(userData);
    setCurrentUsername(username);
    setCurrentPassword(pass);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ username: username, pass: pass }));
    localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify({ userData: userData }));

  }


  function setUserDataLocal(userData) {
    setUserData(userData);
  }




  return (
    <>
      <Router>
        <Navbar name={currentUsername} signedIn={signedIn} />
        <Routes>
          <Route path='/' exact element={
            <Home series={series}
              prevPage={pageNum > 0 ? prevPage : null}
              nextPage={pageNum < 43 ? nextPage : null}
              pageNum={pageNum}
              save={save}
            />}
          />
          <Route path='/search' exact element={<Search series={series} save={save} />} />
          {!loading &&
            <>
              <Route path='/watched' exact element={
                <UserSeries series={userData}
                  prevPage={pageNum > 0 ? prevPage : null}
                  nextPage={pageNum < 43 ? nextPage : null}
                  pageNum={pageNum}
                  category="1"
                  isSignedIn={signedIn}
                  save={save}
                />}
              />
              <Route path='/watching' exact element={
                <UserSeries series={userData}
                  prevPage={pageNum > 0 ? prevPage : null}
                  nextPage={pageNum < 43 ? nextPage : null}
                  pageNum={pageNum}
                  category="2"
                  isSignedIn={signedIn}
                  save={save}
                />}
              />
              <Route path='/want-to-watch' exact element={
                <UserSeries series={userData}
                  prevPage={pageNum > 0 ? prevPage : null}
                  nextPage={pageNum < 43 ? nextPage : null}
                  pageNum={pageNum}
                  category="3"
                  isSignedIn={signedIn}
                  save={save}
                />}
              />

              <Route path='/info' exact element={
                <Info
                  series={series}
                  userData={userData}
                  signedIn={signedIn}
                  setUserDataLocal={setUserDataLocal}
                  username={currentUsername}
                  pass={currentPassword}
                />} />
              <Route path='/profile' exact element={
                <Profile

                  setSignedIn={setSignedIn}
                  setLocalStorage={setLocalStorage}
                  getUserData={getUserData}

                  isSigned={signedIn}
                  userData={userData}
                  save={save}

                />
              }
              />
            </>

          }
          <Route path='/sign-up' exact element={<SignUp isSignedIn={signedIn} setSignedIn={setSignedIn} usernames={usernames} setLocalStorage={setLocalStorage} />} />
          <Route path="*" element={  <Navigate to="/" />}>
          
          
            
          </Route>
        </Routes>
        {loading &&
          <>
            <Loading />
          </>
        }
      </Router>
    </>

  );
}

export default App;
