import React, { useState } from "react";
import { Form, Segment, Card } from "semantic-ui-react";
import axios from "axios";

import {STORAGE_KEY} from '../settings/settings';

export default function Login({ login, register }) {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [user, setUser] = useState({ name: "", email: "" });
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: ""
  });

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
      login(credentials);
    } else {
      register(credentials);
    }
    emptyFormFields();
  };
  
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


  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const emptyFormFields = () => {
    setCredentials({
      name: "",
      email: "",
      password: ""
    });
  };

  return (
    <>
    <Card style={{
         left: '40%',top: '7%' }}>
      <Segment>
          <Form style={{ margin: '5%'}} onSubmit={handleSubmit}>
              <Form.Group widths="equal">
              {!isLogin ? (
                <Form.Input fluid label="Nom" placeholder="Nom" name="name" value={credentials.name} onChange={handleChange}/>
              ) : (
                <br/>
              )}
                <Form.Input fluid label="Email" placeholder="Email" name="email" value={credentials.email} onChange={handleChange}/>
                <Form.Input fluid type="password" label="Mot de passe" placeholder="Mot de passe" name="password" value={credentials.password} onChange={handleChange} />
              </Form.Group>
              <Form.Group inline>
                <Form.Radio label="Login" value="login" checked={isLogin === true} onChange={() => setIsLogin(true)}/>
                <Form.Radio label="Créer un compte" value="register" checked={isLogin === false} onChange={() => setIsLogin(false)}/>
              </Form.Group>
              <Form.Button>
              {isLogin ? "se connecter" : "créer un compte"}
              </Form.Button>
          </Form>
        </Segment>
    </Card>
    </>
  );
}
