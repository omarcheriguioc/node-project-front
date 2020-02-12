import React, {useState } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import axios from "axios";
import {URL} from './settings/settings';
import {STORAGE_KEY} from './settings/settings';
import './App.css';
import HomeUser from './components/HomeUser';
import  MessageContext  from './components/MessageContext'; 
import Login from './components/Login';
import {Menu,Dropdown,Icon} from 'semantic-ui-react';

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
          <Menu>
            <Menu.Item>
              <NavLink exact activeClassName="selected" to='/'> Home </NavLink>
            </Menu.Item>
            <Menu.Item>
              <Dropdown text="theme" id='name' value={theme.theme} >
                <Dropdown.Menu>
                  <Dropdown.Item value='day' onClick= {e=> setTheme({theme: 'day'})}>Jour</Dropdown.Item>
                  <Dropdown.Item value='night' onClick= {e=> setTheme({theme: 'night'})}>Nuit</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
            <Menu.Item position="right">
              <Icon name="user"/><NavLink exact activeClassName="selected" to='/login'> Login as author </NavLink>
            </Menu.Item>
          </Menu>
          <Route exact path='/login' component={Login} />
          <Route exact path='/home' component={HomeUser} />
        </div>
      </MessageContext.Provider>
      {/* {isLoginVisible ? (
        <Login login={handleLogin} register={handleRegister} />
      ) : (
        <HomeUser
          user={user}
          disconnect={disconnect}
          saveUser={handleSave}
        />
      )} */}
    </>
    
  );
}

export default App;
