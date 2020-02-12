import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import './App.css';
import HomeUser from './components/HomeUser';
import  MessageContext  from './components/MessageContext'; 
import Login from './components/Login';
import HomeVisitor from './components/HomeVisitor';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';

function App() {
  const [theme, setTheme] = useState({ theme: "day", message: "" });

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
          <Route exact path='/' component={HomeVisitor} />
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
