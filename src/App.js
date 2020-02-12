import React, {useState } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import axios from "axios";
import {URL} from './settings/settings';
import {STORAGE_KEY} from './settings/settings';
import './App.css';
import HomeUser from './components/HomeUser';
import  MessageContext  from './components/MessageContext'; 
import Login from './components/Login';

function App() {
  const [theme, setTheme] = useState({ theme: "day", message: "" });
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [user, setUser] = useState({ name: "", email: "" });
  const handleLogin = credentials => {
    console.log("credentials", credentials);
    const config = {
      "Content-Type": "application/json"
    };
    axios
      .post(URL+"/login", credentials, config)
        .then(res => {
          console.log("res.data", res.data);
          saveTokenInLocalstorage(res.data.token);
          setIsLoginVisible(false);
          setUser(res.data.user);
        })
        .catch(err => console.error(err));
  };

  const handleRegister = credentials => {
    console.log("handleRegister credentials", credentials);
    const config = {
      "Content-Type": "application/json"
    };
    axios
      .post(URL+"/register", credentials, config)
      .then(res => {
        console.log("res.data", res.data);
        saveTokenInLocalstorage(res.data.token);
        setIsLoginVisible(false);
        setUser(res.data.user);
      })
      .catch(err => console.error(err));
  };

  const saveTokenInLocalstorage = token => {
    localStorage.setItem(STORAGE_KEY, token);
  };

  const disconnect = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsLoginVisible(true);
  };

  const handleSave = user => {
    console.log("handleSave user", user);
    if (user.id !== undefined) {
      updateUser(user);
    } else {
      user.id = Date.now();
      createUser(user);
    }
  };

  const updateUser = user => {
    const config = {
      "Content-Type": "application/json"
    };
    axios
      .put(URL+`/users/${user.id}`, user, config)
        .then(res => {
          console.log("updateUSer / res.data ", res.data);
          axios.get(URL+"/users").then(res => {
            // setIsLoading(true);
            console.log("res.data.users", res.data.users);
            // setFilteredStudents(res.data.users);
            setUser(user);
            // setIsLoading(false);
          });
        })
        .catch(err => console.error(err));
  };

  const createUser = user => {
    const config = {
      "Content-Type": "application/json"
    };
    axios
      .post(URL+`/users/${user.id}`, user, config)
        .then(res => {
          console.log("createUser / res.data", res.data);
          axios.get(URL+"/users").then(res => {
            // setIsLoading(true);
            console.log("res.data.users", res.data.users);
            // setFilteredStudents(res.data.users);
            setUser(user);
            // setIsLoading(false);
          });
        })
        .catch(err => console.error(err));
  };
 
  return (
    <>
      <MessageContext.Provider value={theme}>
        <div  className={ theme.theme === "day" ? "App day" : "App night"}>
          <NavLink exact activeClassName="selected" to='/'> Home </NavLink>
          <NavLink exact activeClassName="selected" to='/login'> Login </NavLink>
          <label htmlFor="theme">
            theme{" "}
            <select id='name' value={theme.theme} onChange= {e=> setTheme({theme: e.target.value})}>
              <option value="day"> Jour</option>
              <option value="night"> Nuit</option>
            </select>
          </label>
          <Route exact path='/home' component={HomeUser} />
          <Route exact path='/login' component={Login} />
        </div>
      </MessageContext.Provider>
      <div class="ui three column grid">
        <div class="column">
          <div class="ui segment">
            <img alt="" src=""></img>
          </div>
          <div class="ui labeled button" tabindex="0">
            <div class="ui button">
              <i class="heart icon"></i> Like
            </div>
            <a class="ui basic label">
              2,048
            </a>
          </div>
          <div class="ui left labeled button" tabindex="0">
            <a class="ui basic right pointing label">
              2,048
            </a>
            <div class="ui button">
              <i class="heart icon"></i> Comment
            </div>
          </div>
        </div>
      </div>
      {isLoginVisible ? (
        <Login login={handleLogin} register={handleRegister} />
      ) : (
        <HomeUser
          user={user}
          disconnect={disconnect}
          saveUser={handleSave}
        />
      )}
    </>
    
  );
}

export default App;
