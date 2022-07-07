import './App.css';
import Navbar from './components/Navbar'
import axios from "axios"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './components/Pages/Home'
import Info from './components/Pages/Info'
import Profile from './components/Pages/Profile';
import SignUp from './components/Pages/SignUp';
import UserSeries from './components/Pages/UserSeries';
import Search from './components/Pages/Search';
import Footer from './components/Footer';
import savedData from './data/data.json'
import get from "./utils/ApiHandler.js";
import getUserData from './utils/ApiHandler.js';

const location = "192.168.0.120";

let username = "init_mate";
let pass = "";

const LOCAL_STORAGE_KEY = "k_project"

function App() {

  const [signedIn, setSignedIn] = useState(false);
  const [userData, setUserData] = useState();
  const [nameInput, setNameInput] = useState();
  const [passInput, setPassInput] = useState();
  const [status, setStatus] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  const [series, setSeries] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  const [usernames, setUsernames] = useState();

  const [logedIn, setLogedIn] = useState(false);


  // Save data to local storage
  useEffect(() => {
    if (username !== "init_mate") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ username: username, pass: pass }));
    }
  }, [logedIn]);

  // Get data from local storage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // console.log(stored);
    if (stored !== null) {
      username = stored.username;
      pass = stored.pass;
      setUserData(getUserData(username, pass));
    }

  }, []);

  // Load user data
  // useEffect(() => {
  //   if (username !== "init_mate" && !signedIn) {
  //     // console.log(username, pass)
  //     apiRequest();

  //   }


  // }, [btnClicked])

  // Load all usernames in use
  // useEffect(() => {
  //   axios.get(`http://${location}:4800/usernames`)
  //     .then(res => {
  //       setUsernames(res.data);
  //     })
  //     .catch(error => console.error(`Error ${error}`));
  // }, []);

  // Get data from all series 
  useEffect(() => {
    setSeries(savedData);
    
    // axios.get(`http://${location}:4800/all`)
    //   .then(res => {
    //     setSeries(res.data);
    //   })
    //   .catch(error => console.error(`Error ${error}`));
  }, [])

  // Handle user input for username in sign in
  function handleNameChange(event) {
    setNameInput(event.target.value);
  }

  // Handle user input for password in sign in
  function handlePassChange(event) {
    setPassInput(event.target.value);
  }

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
  function signIn() {
    username = nameInput;
    pass = passInput;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ username: username, pass: pass }));
    setUserData(getUserData(username, pass));
  }

  function apiRequest() {
    axios.get(`http://${location}:4800/userInfo?username=${username}&password=${pass}`)
    .then(res => {
      if (res.data[0].status === true) {
        setUserData(res.data[0]);
        setSignedIn(true);
        setStatus(false);
        setLogedIn(true)

      } else {
        if (username !== "init_mate") {
          setStatus(res.data[0].error_message);
        }
      }
    })
    .catch(error => console.error(`Error ${error}`));
  }

  async function signUp(ni, pi) {
    username = ni;
    pass = pi;
    // await axios.post(`http://${location}:4800/add`, {
    //   username: ni,
    //   password: pi
    // });
    // apiRequest();
  }

  function logout() {
    localStorage.clear();
    window.location.reload(false);
  }

  function saveNewSeries(newData) {
    delete newData["status"];
    // axios.post(`http://${location}:4800/saveNewUserData`, {
    //   data: {
    //     username: username,
    //     pass: pass,
    //     newData
    //   }
    // });
  }

  function getLocation() {
  }


  return (
    <>
      <Router>
        <Navbar name={username} signedIn={signedIn} getLocation={getLocation} />
        <Routes>
          <Route path='/' exact element={
            <Home series={series}
              prevPage={pageNum > 0 ? prevPage : null}
              nextPage={pageNum < 43 ? nextPage : null}
              pageNum={pageNum} />}
          />
          <Route path='/search' exact element={<Search series={series} />} />
          <Route path='/watched' exact element={
            <UserSeries series={userData}
              prevPage={pageNum > 0 ? prevPage : null}
              nextPage={pageNum < 43 ? nextPage : null}
              pageNum={pageNum}
              category="Watched"
              isSignedIn={signedIn}
            />}
          />
          <Route path='/watching' exact element={
            <UserSeries series={userData}
              prevPage={pageNum > 0 ? prevPage : null}
              nextPage={pageNum < 43 ? nextPage : null}
              pageNum={pageNum}
              category="Watching"
              isSignedIn={signedIn}
            />}
          />
          <Route path='/want-to-watch' exact element={
            <UserSeries series={userData}
              prevPage={pageNum > 0 ? prevPage : null}
              nextPage={pageNum < 43 ? nextPage : null}
              pageNum={pageNum}
              category="Want to watch"
              isSignedIn={signedIn}
            />}
          />

          <Route path='/info' exact element={<Info series={series} data={userData} saveNewSeries={saveNewSeries} signedIn={signedIn} />} />
          <Route path='/profile' exact element={
            <Profile
              handleNameChange={handleNameChange}
              handlePassChange={handlePassChange}
              signIn={signIn}
              status={status}
              isSigned={signedIn}
              userData={userData}
              logout={logout}
            />
          }
          />
          <Route path='/sign-up' exact element={<SignUp isSignedIn={signedIn} setSignedIn={setSignedIn} usernames={usernames} location={location} signUp={signUp} />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
