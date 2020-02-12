import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import './App.css';
import HomeUser from './components/HomeUser';
import  MessageContext  from './components/MessageContext'; 
import Login from './components/Login';
import HomeVisitor from './components/HomeVisitor';

function App() {
  const [theme, setTheme] = useState({ theme: "day", message: "" });

  return (
    <>
      <MessageContext.Provider value={theme}>
        <div  className={ theme.theme === "day" ? "App day" : "App night"}>
          <NavLink exact activeClassName="selected" to='/'> Home </NavLink>
          <NavLink exact activeClassName="selected" to='/login'> Login / register </NavLink>
          <label htmlFor="theme">
            theme{" "}
            <select id='name' value={theme.theme} onChange= {e=> setTheme({theme: e.target.value})}>
              <option value="day"> Jour</option>
              <option value="night"> Nuit</option>
            </select>
          </label>
          <Route exact path='/' component={HomeVisitor} />
          <Route exact path='/login' component={Login} />
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
