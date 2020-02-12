import React, { useState } from "react";
import axios from "axios";

import {STORAGE_KEY, URL} from '../settings/settings';
import { Form, Checkbox, Button, Card, Icon, Segment} from "semantic-ui-react";

export default function Login() {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [user, setUser] = useState({ name: "", email: "" });
  const [connection, setConnection] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [auth, setAuth] = useState(false);

  const saveTokenInLocalstorage = token => {
    localStorage.setItem(STORAGE_KEY, token);
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

  const disconnect = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsLoginVisible(true);
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
  const [isLogin, setIsLogin] = useState(true);

 const handleSubmit = e => {
    e.preventDefault();
    if (isLogin) {
      // login(connection);
    } else {
      // register(connection);
    }
    emptyFormFields();
  };
  
  const handleLogin = () => {
    console.log("connection", connection);
    const config = {
      "Content-Type": "application/json"
    };
    axios
      .post(URL+"/login", connection, config)
        .then(res => {
          console.log("res.data", res.data);
          saveTokenInLocalstorage(res.data.token);
          setIsLoginVisible(false);
          setUser(res.data.user);
          setAuth(true);
        })
        .catch(err => console.error(err));
  };

  const handleRegister = () => {
    console.log("handleRegister connection", connection);
    const config = {
      "Content-Type": "application/json"
    };
    axios
      .post(URL+"/register", connection, config)
      .then(res => {
        console.log("res.data", res.data);
        saveTokenInLocalstorage(res.data.token);
        setIsLoginVisible(false);
        setUser(res.data.user);
      })
      .catch(err => console.error(err));
  };


  const handleChange = e => {
    setConnection({ ...connection, [e.target.name]: e.target.value });
    console.log(connection);
  };

  const emptyFormFields = () => {
    setConnection({
      name: "",
      email: "",
      password: ""
    });
  };

  return (
    <>
    <div>
      <Card style={{
         left: '40%',top: '7%' }}>
        
        <Form style={{ margin: '5%'}} onSubmit={handleSubmit}>
          <Form.Group inline>
            <Form.Radio label="Login" value="login" checked={isLogin === true} onChange={() => setIsLogin(true)}/>
            <Form.Radio label="Créer un compte" value="register" checked={isLogin === false} onChange={() => setIsLogin(false)}/>
          </Form.Group>
          {!isLogin ? (
                <h1 style={{fontWeight:'bold'}}>Register </h1>
                 ) : (
                <h1 style={{fontWeight:'bold'}}>Login</h1>
              )}
          {!isLogin ? (
                <Form.Input fluid  placeholder="Nom" name="name" value={connection.name} onChange={handleChange}/>
              ) : (
                <br/>
              )}    
          <Form.Field>
            <Form.Input fluid  placeholder="Email" name="email" value={connection.email} onChange={handleChange}/>
          </Form.Field>
          <Form.Field>
            <Form.Input fluid  type ='password' placeholder="password" name="password" value={connection.password} onChange={handleChange}/>
          </Form.Field>
          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
          {!isLogin ? (
              <Form.Button onClick={handleRegister}>
              { "Créer un compte"}
              </Form.Button>
                ) : (
              <Form.Button onClick={handleLogin}>
                  {"Se connecter" }
              </Form.Button>
            )}
        </Form>
      </Card>
    </div>

    </>
  );
}
