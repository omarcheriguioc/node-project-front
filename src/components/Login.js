import React, { useState } from "react";
import { Form, Segment, Checkbox, Button } from "semantic-ui-react";

export default function Login({ login, register }) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: ""
  });

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
      {/* <Segment>
        <Form onSubmit={handleSubmit}>
            <Form.Group widths="equal">
            {!isLogin ? (
              <Form.Input fluid label="Nom" placeholder="Nom" name="name" value={credentials.name} onChange={handleChange}/>
            ) : (
              <h5></h5>
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
      </Segment> */}
       <Form>
    <Form.Field>
      <label>First Name</label>
      <input placeholder='First Name' />
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' />
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
    </>
  );
}
